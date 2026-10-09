import React from 'react';
import { TrendingUp, Building2, UserCheck, AlertCircle, ArrowRight } from 'lucide-react';

interface InvestmentSectionProps {
  onDiscussInvestment: () => void;
}

export const InvestmentSection: React.FC<InvestmentSectionProps> = ({
  onDiscussInvestment,
}) => {
  return (
    <section className="py-16 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold tracking-wider uppercase text-[#C5A15A] mb-2">
            Strategic Advisory
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#14283F] leading-tight mb-4">
            Explore Real Estate Investment Opportunities
          </h2>
          <p className="text-base text-[#6B7280] leading-relaxed">
            Real estate can be an important part of a long-term financial plan. Arora Real Estate helps you explore property options based on your objectives, budget, preferred location, and investment horizon.
          </p>
        </div>

        {/* 3 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div className="bg-[#F6F7F9] p-7 rounded-xl border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#14283F] text-[#C5A15A] flex items-center justify-center mb-5">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#14283F] mb-2">
                Residential Investment
              </h3>
              <p className="text-sm text-[#6B7280] leading-relaxed mb-4">
                Explore builder floors, modern apartments, and residential plots in high-demand micro-markets across Delhi NCR for long-term holding.
              </p>
            </div>
            <div className="text-xs text-slate-500 pt-4 border-t border-slate-200">
              Focus: Family tenancy demand & capital preservation
            </div>
          </div>

          <div className="bg-[#F6F7F9] p-7 rounded-xl border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#14283F] text-[#C5A15A] flex items-center justify-center mb-5">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#14283F] mb-2">
                Commercial Opportunities
              </h3>
              <p className="text-sm text-[#6B7280] leading-relaxed mb-4">
                Identify boutique retail shops, high-street frontage assets, and office spaces positioned to benefit from sustained business footfall.
              </p>
            </div>
            <div className="text-xs text-slate-500 pt-4 border-t border-slate-200">
              Focus: Commercial leasing & retail corridors
            </div>
          </div>

          <div className="bg-[#F6F7F9] p-7 rounded-xl border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#14283F] text-[#C5A15A] flex items-center justify-center mb-5">
                <UserCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#14283F] mb-2">
                Personalised Consultation
              </h3>
              <p className="text-sm text-[#6B7280] leading-relaxed mb-4">
                Discuss your liquidity needs, desired holding horizon, and risk tolerance with Esha Arora to narrow down realistic property selections.
              </p>
            </div>
            <div className="text-xs text-slate-500 pt-4 border-t border-slate-200">
              Focus: Objective advisory & budget alignment
            </div>
          </div>
        </div>

        {/* Due Diligence & Regulatory Compliance Notice (Strictly Enforced) */}
        <div className="p-5 bg-amber-50/70 border border-amber-200/80 rounded-xl mb-10 flex items-start gap-3.5">
          <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900 leading-relaxed">
            <span className="font-semibold">Independent Due Diligence Notice:</span> Real estate investments are subject to market conditions, infrastructure developments, and local economic factors. Arora Real Estate does not promise fixed returns, guaranteed appreciation, or speculative yields. All property acquisitions require independent verification of title, approvals, and personal financial due diligence.
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            type="button"
            onClick={onDiscussInvestment}
            className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-[#14283F] hover:bg-[#203D5B] rounded-lg transition-colors shadow-sm cursor-pointer"
          >
            <span>Discuss Investment Options</span>
            <ArrowRight className="w-4 h-4 text-[#C5A15A]" />
          </button>
        </div>
      </div>
    </section>
  );
};
