"use client";

import { useEffect, useRef, useState } from "react";
import AppShell from "@/components/AppShell";
import Disclaimer from "@/components/Disclaimer";
import { agencies } from "@/data/agencies";
import { addVaultDocument, deleteVaultDocument, getVaultDocuments } from "@/lib/storage";
import { AgencyId, VaultDocument } from "@/lib/types";
import { UploadCloud, FileText, Image as ImageIcon, Trash2, FolderLock } from "lucide-react";

const MAX_SIZE_MB = 8;

export default function VaultPage() {
  const [documents, setDocuments] = useState<VaultDocument[]>([]);
  const [dragging, setDragging] = useState(false);
  const [selectedAgency, setSelectedAgency] = useState<AgencyId | "other">("other");
  const [label, setLabel] = useState("");
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setDocuments(getVaultDocuments());
  }, []);

  function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    const file = files[0];
    setError("");

    if (!["application/pdf", "image/png", "image/jpeg", "image/webp"].includes(file.type)) {
      setError("Only PDF, PNG, JPG, or WEBP files are supported.");
      return;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`File is too large. Please upload something under ${MAX_SIZE_MB}MB.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const doc: VaultDocument = {
        id: crypto.randomUUID(),
        agencyId: selectedAgency,
        label: label.trim() || file.name,
        fileName: file.name,
        mimeType: file.type,
        dataUrl: reader.result as string,
        uploadedAt: new Date().toISOString(),
      };
      setDocuments(addVaultDocument(doc));
      setLabel("");
    };
    reader.onerror = () => setError("Couldn't read that file. Please try again.");
    reader.readAsDataURL(file);
  }

  function handleDelete(id: string) {
    setDocuments(deleteVaultDocument(id));
  }

  const agencyName = (id: AgencyId | "other") =>
    id === "other" ? "Other document" : agencies.find((a) => a.id === id)?.name ?? id;

  return (
    <AppShell>
      <div className="space-y-6 pb-24 lg:pb-6">
        <div className="glass-panel p-6">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-accent-violet/20 flex items-center justify-center">
              <FolderLock className="h-5 w-5 text-accent-violet" />
            </div>
            <div>
              <h1 className="font-display font-bold text-2xl text-white">Document Vault</h1>
              <p className="text-white/60 text-sm mt-0.5">
                Files are stored only in this browser's local storage — never uploaded anywhere.
              </p>
            </div>
          </div>
        </div>

        {/* Uploader */}
        <div className="glass-card p-6">
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            <div>
              <label className="text-xs font-semibold text-navy-600 mb-1.5 block">Related to</label>
              <select
                className="input-field"
                value={selectedAgency}
                onChange={(e) => setSelectedAgency(e.target.value as AgencyId | "other")}
              >
                {agencies.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
                <option value="other">Other document</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-navy-600 mb-1.5 block">Label (optional)</label>
              <input
                className="input-field"
                placeholder="e.g. SSS UMID front copy"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
              />
            </div>
          </div>

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              handleFiles(e.dataTransfer.files);
            }}
            onClick={() => fileInputRef.current?.click()}
            className={`rounded-2xl border-2 border-dashed cursor-pointer transition-all flex flex-col items-center justify-center text-center py-10 px-4 ${
              dragging
                ? "border-accent-violet bg-accent-violet/5"
                : "border-navy-200 hover:border-accent-violet/50"
            }`}
          >
            <UploadCloud className="h-8 w-8 text-accent-violet mb-3" />
            <p className="text-navy-700 text-sm font-medium">
              Drag & drop a file here, or click to browse
            </p>
            <p className="text-navy-400 text-xs mt-1">PDF, PNG, JPG, or WEBP — up to {MAX_SIZE_MB}MB</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf,image/png,image/jpeg,image/webp"
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
          </div>

          {error && (
            <p className="text-danger text-sm bg-danger-light rounded-lg px-3 py-2 mt-3">{error}</p>
          )}
        </div>

        {/* Gallery */}
        <div>
          <h2 className="text-white font-semibold mb-3 px-1">
            Your files ({documents.length})
          </h2>
          {documents.length === 0 ? (
            <div className="glass-card p-10 text-center text-navy-400 text-sm">
              No documents uploaded yet. Add your first one above.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {documents.map((doc) => (
                <div key={doc.id} className="glass-card p-4 flex flex-col gap-3">
                  <div className="h-32 rounded-xl bg-navy-50 flex items-center justify-center overflow-hidden">
                    {doc.mimeType.startsWith("image/") ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={doc.dataUrl} alt={doc.label} className="h-full w-full object-cover" />
                    ) : (
                      <FileText className="h-10 w-10 text-navy-300" />
                    )}
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-navy-900 truncate">{doc.label}</p>
                      <p className="text-xs text-navy-400 truncate">
                        {agencyName(doc.agencyId)} ·{" "}
                        {new Date(doc.uploadedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDelete(doc.id)}
                      className="shrink-0 text-navy-300 hover:text-danger transition-colors"
                      aria-label="Delete document"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <a
                    href={doc.dataUrl}
                    download={doc.fileName}
                    className="text-xs font-semibold text-accent-violet hover:text-accent-indigo inline-flex items-center gap-1"
                  >
                    <ImageIcon className="h-3.5 w-3.5" />
                    Download copy
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>

        <Disclaimer />
      </div>
    </AppShell>
  );
}
