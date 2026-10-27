"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createDestination } from "@/lib/api";
import { AlertCircle, CheckCircle2, Loader2, Save, Trash2, X } from "lucide-react";

const categories = [
  "Beach",
  "Mountain",
  "City Tour",
  "Cruise",
  "Adventure",
  "Cultural",
];

const inputStyle =
  "mt-2 h-12 w-full rounded-[4px] border border-[#f0f1f3] bg-[#f8fafc] px-4 text-[15px] text-ink placeholder:text-[#adb2b6] transition-colors focus-visible:border-brand focus-visible:bg-white focus-visible:ring-1 focus-visible:ring-brand shadow-none";

const labelStyle = "block text-[15px] font-medium text-ink";

interface FormData {
  name: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
}

const initialFormState: FormData = {
  name: "",
  country: "",
  category: "Beach",
  price: "",
  duration: "",
  departureDate: "",
  imageUrl: "",
  description: "",
};

export function AddDestinationForm() {
  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleCategoryChange = (value: string | null) => {
    if (value) {
      setFormData((prev) => ({ ...prev, category: value }));
    }
  };

  const handleCancel = () => {
    console.log("ℹ️ [FRONTEND UI] Form reset / cancel triggered");
    setFormData(initialFormState);
    setSuccessMessage(null);
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("📝 [FRONTEND UI] Submitting destination form with state:", formData);
    setSuccessMessage(null);
    setErrorMessage(null);

    if (!formData.name.trim() || !formData.country.trim()) {
      console.warn("⚠️ [FRONTEND VALIDATION] Validation failed: missing Name or Country");
      setErrorMessage("Please enter both Destination Name and Country.");
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await createDestination(formData);

      if (res.success && res.data) {
        console.log("🎉 [FRONTEND UI] Destination created successfully:", res.data);
        setSuccessMessage(
          `"${res.data.name}" has been successfully saved to the database!`
        );
        setFormData(initialFormState);
        window.scrollTo({ top: 120, behavior: "smooth" });
      } else {
        console.error("❌ [FRONTEND UI] Destination creation failed:", res.error);
        setErrorMessage(res.error || "Failed to create destination package.");
      }
    } catch (err) {
      console.error("❌ [FRONTEND UI] Form submission caught exception:", err);
      setErrorMessage("An unexpected network error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto mt-12 w-full max-w-[760px] rounded-[6px] border border-[#f0f0f2] bg-white p-7 shadow-[0_2px_16px_rgba(0,0,0,0.03)] md:mt-14 md:p-10">
      {errorMessage && (
        <div className="mb-6 flex items-center justify-between rounded-[4px] border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-800 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="size-5 shrink-0 text-red-600" />
            <span>{errorMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setErrorMessage(null)}
            className="text-red-700 hover:text-red-900"
            aria-label="Dismiss error"
          >
            <X className="size-4" />
          </button>
        </div>
      )}

      {successMessage && (
        <div className="mb-6 flex items-center justify-between rounded-[4px] border border-emerald-200 bg-emerald-50 px-4 py-3 text-[14px] text-emerald-800 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="size-5 shrink-0 text-emerald-600" />
            <span>{successMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setSuccessMessage(null)}
            className="text-emerald-700 hover:text-emerald-900"
            aria-label="Dismiss message"
          >
            <X className="size-4" />
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Destination Name */}
        <div>
          <Label htmlFor="name" className={labelStyle}>
            Destination Name
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Bali Paradise"
            spellCheck={false}
            value={formData.name}
            onChange={handleChange}
            className={inputStyle}
          />
        </div>

        {/* Country + Category */}
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <Label htmlFor="country" className={labelStyle}>
              Country
            </Label>
            <Input
              id="country"
              type="text"
              placeholder="Indonesia"
              spellCheck={false}
              value={formData.country}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>
          <div>
            <Label htmlFor="category" className={labelStyle}>
              Category
            </Label>
            <Select
              value={formData.category}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger
                id="category"
                aria-label="Category"
                className="mt-2! h-12! w-full rounded-[4px]! border border-[#f0f1f3]! bg-[#f8fafc]! px-4 text-[15px]! text-ink shadow-none focus-visible:border-brand! focus-visible:ring-1! focus-visible:ring-brand! md:hover:bg-[#f8fafc]"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-[4px] border border-[#f0f1f3] bg-white shadow-md">
                {categories.map((category) => (
                  <SelectItem key={category} value={category} className="text-[15px]">
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Price + Duration */}
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <Label htmlFor="price" className={labelStyle}>
              Price (USD)
            </Label>
            <Input
              id="price"
              type="text"
              inputMode="numeric"
              placeholder="e.g., 1299"
              spellCheck={false}
              value={formData.price}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>
          <div>
            <Label htmlFor="duration" className={labelStyle}>
              Duration
            </Label>
            <Input
              id="duration"
              type="text"
              placeholder="e.g., 7 Days/6 Nights"
              spellCheck={false}
              value={formData.duration}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>
        </div>

        {/* Departure Date */}
        <div>
          <Label htmlFor="departureDate" className={labelStyle}>
            Departure Date
          </Label>
          <Input
            id="departureDate"
            type="text"
            placeholder="mm/dd/yyyy"
            spellCheck={false}
            value={formData.departureDate}
            onChange={handleChange}
            className={inputStyle}
          />
        </div>

        {/* Image URL */}
        <div>
          <Label htmlFor="imageUrl" className={labelStyle}>
            Image URL
          </Label>
          <Input
            id="imageUrl"
            type="url"
            placeholder="https://example.com/image.jpg"
            spellCheck={false}
            value={formData.imageUrl}
            onChange={handleChange}
            className={inputStyle}
          />
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description" className={labelStyle}>
            Description
          </Label>
          <Textarea
            id="description"
            placeholder="Describe the travel experience..."
            spellCheck={false}
            rows={5}
            value={formData.description}
            onChange={handleChange}
            className="mt-2 min-h-[140px] w-full rounded-[4px] border border-[#f0f1f3] bg-[#f8fafc] p-4 text-[15px] text-ink placeholder:text-[#adb2b6] transition-colors focus-visible:border-brand focus-visible:bg-white focus-visible:ring-1 focus-visible:ring-brand resize-y shadow-none"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3.5 pt-3">
          <Button
            type="button"
            variant="outline"
            disabled={isSubmitting}
            onClick={handleCancel}
            className="h-11 rounded-[4px] border border-[#ef4444] bg-white px-6 text-[15px] font-medium text-[#ef4444] shadow-none transition-colors hover:bg-red-50 hover:text-[#ef4444] focus-visible:border-[#ef4444]/40 focus-visible:ring-2 focus-visible:ring-[#ef4444]/20 disabled:opacity-50"
          >
            <Trash2 className="size-4" strokeWidth={1.8} />
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-11 rounded-[4px] bg-brand px-6 text-[15px] font-medium text-white shadow-none transition-colors hover:bg-brand/90 focus-visible:ring-2 focus-visible:ring-brand/40 disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="size-4" strokeWidth={1.8} />
                Add Travel Package
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
