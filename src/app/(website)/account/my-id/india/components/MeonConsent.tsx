"use client";

import React from "react";
import {
  Check,
  Folder,
  User,
  Calendar,
  Pencil,
  ShieldCheck,
} from "lucide-react";

interface MeonConsentProps {
  documentsAccordionOpen: boolean;
  setDocumentsAccordionOpen: (val: boolean) => void;
  selectAllDocuments: boolean;
  setSelectAllDocuments: (val: boolean) => void;
  degreeChecked: boolean;
  setDegreeChecked: (val: boolean) => void;
  drivingChecked: boolean;
  setDrivingChecked: (val: boolean) => void;
  purposeValue: string;
  setPurposeValue: (val: string) => void;
  onDeny: () => void;
  onAllow: () => void;
}

export default function MeonConsent({
  documentsAccordionOpen,
  setDocumentsAccordionOpen,
  selectAllDocuments,
  setSelectAllDocuments,
  degreeChecked,
  setDegreeChecked,
  drivingChecked,
  setDrivingChecked,
  purposeValue,
  setPurposeValue,
  onDeny,
  onAllow,
}: MeonConsentProps) {
  return (
    <div className="space-y-6 text-center animate-in fade-in duration-300">
      <div className="flex flex-col items-center space-y-1.5">
        <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-md shrink-0">
          <ShieldCheck className="text-white w-5 h-5" />
        </div>
        <div>
          <h2 className="text-[1.2rem] font-black tracking-tight leading-none text-slate-800">
            Digi<span className="text-indigo-600">Locker</span>
          </h2>
          <p className="text-[0.5rem] text-slate-400 font-semibold pt-0.5">
            Your documents anytime, anywhere
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-md text-left text-[0.85rem] max-w-[480px] mx-auto space-y-5">
        <p className="text-[0.88rem] text-slate-700 leading-normal font-semibold">
          Please provide your consent to share the following with{" "}
          <span className="text-slate-800 font-bold">MEON</span>:
        </p>

        <div className="space-y-4 pt-1">
          <div className="border-b border-slate-100 pb-3 space-y-2">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setDocumentsAccordionOpen(!documentsAccordionOpen)}
            >
              <div className="flex items-center gap-2 font-bold text-slate-700">
                <span className="text-slate-400 text-xs">▼</span>
                <span>Issued Documents (18)</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[0.78rem] text-[#09A6A4] font-bold">
                  Select all
                </span>
                <input
                  type="checkbox"
                  checked={selectAllDocuments}
                  onChange={(e) => {
                    const val = e.target.checked;
                    setSelectAllDocuments(val);
                    setDegreeChecked(val);
                    setDrivingChecked(val);
                  }}
                  onClick={(e) => e.stopPropagation()}
                  className="w-4 h-4 rounded border-slate-200 text-[#09A6A4] focus:ring-[#09A6A4] cursor-pointer"
                />
              </div>
            </div>

            {documentsAccordionOpen && (
              <div className="pl-4 pt-2 space-y-3 border-l-2 border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 font-medium">
                    Aadhaar Card{" "}
                    <span className="text-[0.72rem] text-slate-400 italic font-medium">
                      (can be accessed)
                    </span>
                  </span>
                  <Check
                    size={16}
                    className="text-[#09A6A4] font-black mr-0.5"
                    strokeWidth={3}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">
                    Degree Certificate{" "}
                    <span className="text-[0.72rem] text-slate-400 italic font-medium">
                      (can be accessed)
                    </span>
                  </span>
                  <input
                    type="checkbox"
                    checked={degreeChecked}
                    onChange={(e) => setDegreeChecked(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-200 text-[#09A6A4] focus:ring-[#09A6A4]"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">
                    Driving License{" "}
                    <span className="text-[0.72rem] text-slate-400 italic font-medium">
                      (can be accessed)
                    </span>
                  </span>
                  <input
                    type="checkbox"
                    checked={drivingChecked}
                    onChange={(e) => setDrivingChecked(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-200 text-[#09A6A4] focus:ring-[#09A6A4]"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-600 font-medium">
                    PAN Verification Record{" "}
                    <span className="text-[0.72rem] text-slate-400 italic font-medium">
                      (can be accessed)
                    </span>
                  </span>
                  <Check
                    size={16}
                    className="text-[#09A6A4] font-black mr-0.5"
                    strokeWidth={3}
                  />
                </div>

                <p className="text-[0.78rem] text-blue-600 font-bold hover:underline cursor-pointer pt-1">
                  ... View all 18 documents
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
            <div className="flex items-center gap-2 font-bold text-slate-700">
              <Folder size={16} className="text-slate-400" />
              <span>DigiLocker Drive</span>
            </div>
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-slate-200 text-[#09A6A4]"
            />
          </div>

          <div className="border-b border-slate-100 pb-3.5 space-y-1">
            <div className="flex items-center gap-2 font-bold text-slate-700">
              <User size={16} className="text-slate-400" />
              <span>Profile information</span>
            </div>
            <p className="text-[0.78rem] text-slate-400 font-semibold pl-6">
              Name, Date of Birth, Gender
            </p>
          </div>

          <div className="border-b border-slate-100 pb-3.5 flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-bold text-slate-700">
                <Calendar size={16} className="text-slate-400" />
                <span>
                  Consent validity date{" "}
                  <span className="text-[0.7rem] text-slate-400 font-normal">
                    (Today + 30 days)
                  </span>
                </span>
              </div>
              <p className="text-[0.78rem] text-slate-500 font-bold pl-6">
                16-Apr-2026
              </p>
            </div>

            <button className="text-[#09A6A4] hover:text-[#09A6A4]/80 p-1.5 focus:outline-none">
              <Pencil size={15} />
            </button>
          </div>

          <div className="space-y-1.5 pb-2">
            <div className="flex items-center gap-2 font-bold text-slate-700">
              <span className="text-slate-400 text-xs">?</span>
              <span>Purpose</span>
            </div>

            <select
              value={purposeValue}
              onChange={(e) => setPurposeValue(e.target.value)}
              className="w-full h-10 px-3 border border-slate-200 bg-slate-50/50 rounded-xl text-[0.82rem] text-slate-700 font-semibold focus:outline-none focus:border-[#09A6A4]"
            >
              <option value="Know Your Customer">Know Your Customer</option>
              <option value="Employment Check">Employment Check</option>
              <option value="Address Verification">Address Verification</option>
            </select>
          </div>
        </div>

        <p className="text-[0.75rem] text-slate-400 font-medium leading-relaxed pt-1">
          Consent validity is subject to applicable laws. By clicking 'Allow',
          you are giving consent to share with{" "}
          <span className="text-slate-500 font-bold">MEON</span>.
        </p>

        <div className="flex gap-4 pt-2">
          <button
            onClick={onDeny}
            className="flex-1 py-3.5 bg-white border-2 border-[#09A6A4]/20 text-[#09A6A4] rounded-xl font-extrabold hover:bg-slate-50 transition-colors shadow-xs text-center"
          >
            Deny
          </button>

          <button
            onClick={onAllow}
            className="flex-1 py-3.5 bg-[#09A6A4] text-white rounded-xl font-extrabold shadow-lg shadow-[#09A6A4]/25 hover:scale-[1.01] transition-transform cursor-pointer text-center"
          >
            Allow
          </button>
        </div>
      </div>
    </div>
  );
}
