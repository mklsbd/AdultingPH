"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { MapPin, LocateFixed, ShieldCheck, Loader2 } from "lucide-react";
import { phLocations } from "@/data/locations";
import { saveProfile } from "@/lib/storage";

export default function LocationOnboardingPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [region, setRegion] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [detecting, setDetecting] = useState(false);
  const [detectError, setDetectError] = useState("");

  const selectedRegion = phLocations.find((r) => r.region === region);
  const selectedProvince = selectedRegion?.provinces.find((p) => p.name === province);

  function detectLocation() {
    setDetectError("");
    if (!navigator.geolocation) {
      setDetectError("Your browser doesn't support automatic location detection. Please select manually.");
      return;
    }
    setDetecting(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          const addr = data.address ?? {};
          const detectedCity: string =
            addr.city || addr.town || addr.municipality || addr.county || "";

          let found = false;
          for (const r of phLocations) {
            for (const p of r.provinces) {
              const match = p.cities.find((c) =>
                detectedCity.toLowerCase().includes(c.toLowerCase().replace(" city", ""))
              );
              if (match) {
                setRegion(r.region);
                setProvince(p.name);
                setCity(match);
                found = true;
                break;
              }
            }
            if (found) break;
          }
          if (!found) {
            setDetectError(
              `We found "${detectedCity || "your area"}" but couldn't match it exactly — please select your region, province, and city below.`
            );
          }
        } catch {
          setDetectError("Couldn't detect your location automatically. Please select it manually below.");
        } finally {
          setDetecting(false);
        }
      },
      () => {
        setDetectError("Location permission denied. Please select your region, province, and city manually.");
        setDetecting(false);
      }
    );
  }

  function handleContinue() {
    saveProfile({
      name: session?.user?.name ?? "Jobseeker",
      email: session?.user?.email ?? "",
      region,
      province,
      city,
      onboardingComplete: true,
    });
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg">
        <div className="flex items-center justify-center gap-2 text-white font-display font-bold text-lg mb-8">
          <ShieldCheck className="h-6 w-6 text-accent-violet" />
          AdultingPH
        </div>

        <div className="glass-panel-light p-7 sm:p-9">
          <div className="h-12 w-12 rounded-2xl bg-accent-violet/15 flex items-center justify-center mx-auto mb-5">
            <MapPin className="h-6 w-6 text-accent-violet" />
          </div>
          <h1 className="font-display font-bold text-2xl text-navy-900 text-center">
            Where are you based?
          </h1>
          <p className="text-navy-500 text-sm text-center mt-2 mb-7 leading-relaxed">
            We'll use this to point you to the nearest SSS, NBI, PhilHealth, Pag-IBIG, and BIR
            offices. This stays on your device.
          </p>

          <button
            onClick={detectLocation}
            disabled={detecting}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-accent-violet/30 bg-accent-violet/5 px-5 py-3 text-sm font-semibold text-accent-violet hover:bg-accent-violet/10 transition-all mb-3 disabled:opacity-60"
          >
            {detecting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <LocateFixed className="h-4 w-4" />
            )}
            {detecting ? "Detecting your location…" : "Detect my location automatically"}
          </button>

          {detectError && (
            <p className="text-warning-dark text-xs bg-warning-light rounded-lg px-3 py-2 mb-4">
              {detectError}
            </p>
          )}

          <div className="flex items-center gap-3 my-5">
            <div className="h-px flex-1 bg-navy-100" />
            <span className="text-navy-300 text-xs font-medium">OR SELECT MANUALLY</span>
            <div className="h-px flex-1 bg-navy-100" />
          </div>

          <div className="space-y-3.5">
            <div>
              <label className="text-xs font-semibold text-navy-600 mb-1.5 block">Region</label>
              <select
                className="input-field"
                value={region}
                onChange={(e) => {
                  setRegion(e.target.value);
                  setProvince("");
                  setCity("");
                }}
              >
                <option value="">Select region</option>
                {phLocations.map((r) => (
                  <option key={r.region} value={r.region}>
                    {r.region}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-navy-600 mb-1.5 block">Province</label>
              <select
                className="input-field"
                value={province}
                disabled={!selectedRegion}
                onChange={(e) => {
                  setProvince(e.target.value);
                  setCity("");
                }}
              >
                <option value="">Select province</option>
                {selectedRegion?.provinces.map((p) => (
                  <option key={p.name} value={p.name}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-navy-600 mb-1.5 block">City / Municipality</label>
              <select
                className="input-field"
                value={city}
                disabled={!selectedProvince}
                onChange={(e) => setCity(e.target.value)}
              >
                <option value="">Select city</option>
                {selectedProvince?.cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleContinue}
            disabled={!region || !province || !city}
            className="btn-accent w-full mt-7 py-3"
          >
            Continue to my dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
