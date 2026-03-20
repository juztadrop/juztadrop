import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useNgo } from '@/contexts/NgoContext';
import { toast } from 'sonner';
import { getApiErrorMessage } from '@/lib/api-proxy';
import { uploadToStorage } from '@/lib/storage';

export interface EditOrganizationForm {
  orgName: string;
  type: string;
  registrationNumber: string;
  address: string;
  city: string;
  state: string;
  contactPersonName: string;
  contactPersonEmail: string;
  contactPersonNumber: string;
  description: string;
  website: string;
  causes: string[];
  registrationDoc: File | null;
  proofDoc: File | null;
}

const MAX_FILE_SIZE = 1024 * 1024;

export function useEditOrganization(orgId: string | undefined) {
  const router = useRouter();
  const { refetchOrgs, organizations } = useNgo();
  const [form, setForm] = useState<EditOrganizationForm>({
    orgName: '',
    type: '',
    registrationNumber: '',
    address: '',
    city: '',
    state: '',
    contactPersonName: '',
    contactPersonEmail: '',
    contactPersonNumber: '',
    description: '',
    website: '',
    causes: [],
    registrationDoc: null,
    proofDoc: null,
  });
  const [loading, setLoading] = useState(!!orgId);
  const [submitting, setSubmitting] = useState(false);

  const orgFromContext = organizations.find((o) => o.id === orgId);
  const orgFromContextExtended = orgFromContext as
    | (typeof orgFromContext & {
        type?: string | null;
        registrationNumber?: string | null;
        address?: string | null;
        city?: string | null;
        state?: string | null;
        contactPersonName?: string;
        contactPersonEmail?: string;
        contactPersonNumber?: string | null;
        website?: string | null;
      })
    | undefined;

  useEffect(() => {
    if (!orgId) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    fetch(`/api/organizations/${orgId}`, { credentials: 'include' })
      .then((res) => res.json().catch(() => ({})))
      .then((data) => {
        if (cancelled) return;
        const org = data?.organization ?? data;
        if (org) {
          setForm({
            orgName: org.orgName ?? '',
            type: org.type ?? '',
            registrationNumber: org.registrationNumber ?? '',
            address: org.address ?? '',
            city: org.city ?? '',
            state: org.state ?? '',
            contactPersonName: org.contactPersonName ?? '',
            contactPersonEmail: org.contactPersonEmail ?? '',
            contactPersonNumber: org.contactPersonNumber ?? '',
            description: org.description ?? '',
            website: org.website ?? '',
            causes: Array.isArray(org.causes) ? org.causes : [],
            registrationDoc: null,
            proofDoc: null,
          });
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [orgId]);

  const toggleCause = useCallback((value: string) => {
    setForm((f) => ({
      ...f,
      causes: f.causes.includes(value) ? f.causes.filter((x) => x !== value) : [...f.causes, value],
    }));
  }, []);

  const getFormatFromFile = (file: File) => {
    const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
    if (ext === 'pdf') return 'pdf';
    if (['jpg', 'jpeg'].includes(ext)) return ext;
    if (ext === 'png') return 'png';
    return ext || 'bin';
  };

  const handleFileChange =
    (field: 'registrationDoc' | 'proofDoc') => (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        if (file.size > MAX_FILE_SIZE) {
          toast.error(
            `File must be under 1 MB. ${file.name} is ${(file.size / 1024).toFixed(0)} KB.`
          );
          e.target.value = '';
          return;
        }
        setForm((f) => ({ ...f, [field]: file }));
      }
    };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!orgId) return;
      setSubmitting(true);
      try {
        const documents: Array<{ documentType: string; documentAssetUrl: string; format: string }> =
          [];

        if (form.registrationDoc) {
          const { assetKey } = await uploadToStorage(form.registrationDoc, 'documents');
          documents.push({
            documentType: 'registration_certificate',
            documentAssetUrl: assetKey,
            format: getFormatFromFile(form.registrationDoc),
          });
        }
        if (form.proofDoc) {
          const { assetKey } = await uploadToStorage(form.proofDoc, 'documents');
          documents.push({
            documentType: 'proof_of_address',
            documentAssetUrl: assetKey,
            format: getFormatFromFile(form.proofDoc),
          });
        }

        const res = await fetch(`/api/organizations/${orgId}`, {
          method: 'PATCH',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orgName: form.orgName,
            type: form.type || null,
            description: form.description || null,
            causes: form.causes,
            website: form.website || null,
            registrationNumber: form.registrationNumber || null,
            contactPersonName: form.contactPersonName,
            contactPersonEmail: form.contactPersonEmail,
            contactPersonNumber: form.contactPersonNumber || null,
            address: form.address || null,
            city: form.city || null,
            state: form.state || null,
            country: 'India',
            ...(documents.length > 0 && { documents }),
          }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(getApiErrorMessage(data, 'Failed to update organization'));
        toast.success('Organization updated');
        await refetchOrgs();
        router.push(`/organisations/${orgId}`);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Failed to update organization');
      } finally {
        setSubmitting(false);
      }
    },
    [orgId, form, refetchOrgs, router]
  );

  return {
    form,
    setForm,
    loading,
    submitting,
    toggleCause,
    handleFileChange,
    handleSubmit,
    orgFromContext: orgFromContextExtended,
  };
}
