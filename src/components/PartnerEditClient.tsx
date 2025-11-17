"use client";

import { useState } from "react";
import { Partner } from "@/src/services/partnerService";
import { useRouter } from "next/navigation";

interface PartnerEditClientProps {
  partners: Partner[];
}

export default function PartnerEditClient({ partners }: PartnerEditClientProps) {
  const router = useRouter();
  const [selectedPartnerId, setSelectedPartnerId] = useState<number | null>(null);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    url: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");

  const handlePartnerSelect = (partnerId: number) => {
    setSelectedPartnerId(partnerId);
    setIsCreatingNew(false);
    const partner = partners.find((p) => p.id === partnerId);
    if (partner) {
      setEditingPartner(partner);
      setFormData({
        name: partner.name,
        logo: partner.logo,
        url: partner.url,
      });
      setSubmitStatus("idle");
      setErrorMessage("");
    }
  };

  const handleCreateNew = () => {
    setSelectedPartnerId(null);
    setEditingPartner(null);
    setIsCreatingNew(true);
    setFormData({
      name: "",
      logo: "",
      url: "",
    });
    setSubmitStatus("idle");
    setErrorMessage("");
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name || !formData.logo || !formData.url) {
      setSubmitStatus("error");
      setErrorMessage("All fields are required");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      if (isCreatingNew) {
        // Create new partner
        const response = await fetch("/api/partners", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok) {
          setSubmitStatus("success");
          // Refresh the page to get updated data
          setTimeout(() => {
            router.refresh();
            setIsCreatingNew(false);
          }, 2000);
        } else {
          throw new Error(result.error || "Failed to create partner");
        }
      } else if (editingPartner) {
        // Update existing partner
        const response = await fetch("/api/partners", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: editingPartner.id,
            ...formData,
          }),
        });

        const result = await response.json();

        if (response.ok) {
          setSubmitStatus("success");
          // Refresh the page to get updated data
          setTimeout(() => {
            router.refresh();
          }, 2000);
        } else {
          throw new Error(result.error || "Failed to update partner");
        }
      }
    } catch (error: any) {
      setSubmitStatus("error");
      setErrorMessage(
        error.message || "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!editingPartner) return;

    setIsDeleting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/partners", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: editingPartner.id,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        setShowDeleteConfirm(false);
        // Refresh the page to get updated data
        setTimeout(() => {
          router.refresh();
          setEditingPartner(null);
          setSelectedPartnerId(null);
        }, 1500);
      } else {
        throw new Error(result.error || "Failed to delete partner");
      }
    } catch (error: any) {
      setSubmitStatus("error");
      setErrorMessage(
        error.message || "Something went wrong. Please try again."
      );
      setShowDeleteConfirm(false);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/svg+xml",
    ];
    if (!validTypes.includes(file.type)) {
      setSubmitStatus("error");
      setErrorMessage(
        "Invalid file type. Only JPEG, PNG, GIF, SVG, and WebP images are allowed."
      );
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setSubmitStatus("error");
      setErrorMessage("File too large. Maximum size is 5MB.");
      return;
    }

    setIsUploadingImage(true);
    setUploadProgress("Uploading logo...");
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/partners/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setFormData((prev) => ({
          ...prev,
          logo: result.url,
        }));
        setUploadProgress("Logo uploaded successfully!");
        setTimeout(() => setUploadProgress(""), 3000);
      } else {
        throw new Error(result.error || "Failed to upload logo");
      }
    } catch (error: any) {
      setSubmitStatus("error");
      setErrorMessage(
        error.message || "Failed to upload logo. Please try again."
      );
    } finally {
      setIsUploadingImage(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
      {/* Partner List */}
      <div className="lg:col-span-1">
        <div className="card bg-white shadow-lg rounded-2xl border border-base-200 p-4 lg:p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg lg:text-xl font-bold text-primary">
              Select Partner
            </h2>
            <button
              onClick={handleCreateNew}
              className="btn btn-primary btn-sm"
              title="Create New Partner"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              New
            </button>
          </div>

          <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto">
            {partners.length === 0 ? (
              <p className="text-sm text-base-content/60 text-center py-8">
                No partners yet. Create one to get started.
              </p>
            ) : (
              partners.map((partner) => (
                <button
                  key={partner.id}
                  onClick={() => handlePartnerSelect(partner.id!)}
                  className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                    selectedPartnerId === partner.id
                      ? "border-primary bg-primary/5"
                      : "border-base-200 hover:border-primary/40 bg-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {partner.logo && (
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="w-10 h-10 object-contain rounded"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">
                        {partner.name}
                      </div>
                      <div className="text-xs text-base-content/60 truncate">
                        {partner.url}
                      </div>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Edit Form */}
      <div className="lg:col-span-2">
        <div className="card bg-white shadow-lg rounded-2xl border border-base-200 p-4 lg:p-6">
          <h2 className="text-lg lg:text-xl font-bold text-primary mb-4">
            {isCreatingNew
              ? "Create New Partner"
              : editingPartner
                ? "Edit Partner"
                : "Select a partner to edit"}
          </h2>

          {(isCreatingNew || editingPartner) && (
            <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
              {/* Status Messages */}
              {submitStatus === "success" && (
                <div className="alert alert-success text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current shrink-0 h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>
                    {isCreatingNew
                      ? "Partner created successfully!"
                      : "Partner updated successfully!"}
                  </span>
                </div>
              )}

              {submitStatus === "error" && errorMessage && (
                <div className="alert alert-error text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current shrink-0 h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Partner Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Partner Name *</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter partner name"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Logo Upload */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Logo *</span>
                </label>
                
                {/* File Upload */}
                <div className="mb-2">
                  <input
                    type="file"
                    onChange={handleImageUpload}
                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,image/svg+xml"
                    className="file-input file-input-bordered w-full"
                    disabled={isUploadingImage}
                  />
                  {uploadProgress && (
                    <p className="text-sm text-success mt-2">{uploadProgress}</p>
                  )}
                  {isUploadingImage && (
                    <p className="text-sm text-base-content/60 mt-2">
                      Uploading...
                    </p>
                  )}
                </div>

                {/* Or enter URL manually */}
                <div className="divider text-xs text-base-content/60">OR</div>
                <input
                  type="url"
                  value={formData.logo}
                  onChange={(e) => handleInputChange("logo", e.target.value)}
                  placeholder="Or enter logo URL"
                  className="input input-bordered w-full"
                  required
                />
                
                {/* Logo Preview */}
                {formData.logo && (
                  <div className="mt-3">
                    <p className="text-sm text-base-content/70 mb-2">Preview:</p>
                    <div className="border border-base-200 rounded-lg p-4 bg-base-100">
                      <img
                        src={formData.logo}
                        alt="Logo preview"
                        className="max-h-32 object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%23ddd' width='100' height='100'/%3E%3Ctext fill='%23999' x='50%25' y='50%25' text-anchor='middle' dy='.3em' font-size='14'%3EInvalid URL%3C/text%3E%3C/svg%3E";
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Website URL */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Website URL *</span>
                </label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => handleInputChange("url", e.target.value)}
                  placeholder="https://example.com"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  type="submit"
                  className="btn btn-primary flex-1"
                  disabled={isSubmitting || isUploadingImage}
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      {isCreatingNew ? "Creating..." : "Updating..."}
                    </>
                  ) : (
                    <>{isCreatingNew ? "Create Partner" : "Update Partner"}</>
                  )}
                </button>

                {editingPartner && !isCreatingNew && (
                  <button
                    type="button"
                    onClick={() => setShowDeleteConfirm(true)}
                    className="btn btn-error"
                    disabled={isDeleting}
                  >
                    Delete
                  </button>
                )}
              </div>
            </form>
          )}

          {!isCreatingNew && !editingPartner && (
            <div className="text-center py-12">
              <svg
                className="w-16 h-16 mx-auto text-base-content/20 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <p className="text-base-content/60">
                Select a partner from the list or create a new one
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirm Delete</h3>
            <p className="py-4">
              Are you sure you want to delete &quot;{editingPartner?.name}&quot;? This
              action cannot be undone.
            </p>
            <div className="modal-action">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="btn"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="btn btn-error"
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
