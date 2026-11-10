import React, { useState } from 'react';
import { useCurriculum } from '../../context/CurriculumContext';
import { CertificateProduct, Certificate } from '../../types/cybersecurity';
import {
  Award,
  ShieldCheck,
  Check,
  QrCode,
  Tag,
  Sparkles,
  ShoppingBag,
  ExternalLink,
  ArrowRight,
  GraduationCap,
  Receipt,
  FileCheck
} from 'lucide-react';

interface CertificateStoreProps {
  onOpenCertificateModal: (cert: Certificate) => void;
  onNavigateToScholarships: () => void;
}

export const CertificateStore: React.FC<CertificateStoreProps> = ({
  onOpenCertificateModal,
  onNavigateToScholarships
}) => {
  const {
    products,
    orders,
    userVouchers,
    purchaseCertificate,
    settings,
    certificates
  } = useCurriculum();

  const [selectedProduct, setSelectedProduct] = useState<CertificateProduct | null>(null);
  const [voucherInput, setVoucherInput] = useState<string>('');
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'all' | 'foundational' | 'professional' | 'specialized-track' | 'enterprise-bundle'>('all');
  const [purchaseStatus, setPurchaseStatus] = useState<{
    success: boolean;
    cert?: Certificate;
    message: string;
  } | null>(null);

  const filteredProducts = products.filter(p => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  const handleOpenCheckout = (product: CertificateProduct) => {
    setSelectedProduct(product);
    // pre-fill latest voucher if user has one
    if (userVouchers.length > 0) {
      setVoucherInput(userVouchers[userVouchers.length - 1]);
    } else {
      setVoucherInput('');
    }
    setPurchaseStatus(null);
    setCheckoutModalOpen(true);
  };

  const handleCompletePurchase = () => {
    if (!selectedProduct) return;
    const result = purchaseCertificate(selectedProduct.id, voucherInput.trim());
    setPurchaseStatus(result);
  };

  const getCurrencySymbol = (currency: string) => {
    switch (currency) {
      case 'EUR': return '€';
      case 'GBP': return '£';
      default: return '$';
    }
  };

  const sym = getCurrencySymbol(settings.currency);

  return (
    <div className="space-y-8">
      {/* Hero & Scholarship Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-6 md:p-8 border border-indigo-500/20 text-white shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            Official Credential Verification Marketplace
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Accredited Cybersecurity & IoT Certification Store
          </h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Acquire industry-recognized, cryptographically verifiable credentials for your completed courses and tracks.
            All credentials include a permanent registry listing, tamper-proof QR verification, and employer shareable badges.
          </p>

          {/* Scholarship callout */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={onNavigateToScholarships}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold shadow-md transition-all cursor-pointer"
            >
              <GraduationCap className="w-4 h-4" />
              Apply for 100% Scholarship Grant
              <ArrowRight className="w-4 h-4" />
            </button>
            <span className="text-xs text-slate-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Tuition waivers available across Youth (16-24), Mid-Career (25-40), Senior (40+), and IoT Fellowships.
            </span>
          </div>
        </div>
      </div>

      {/* Active User Vouchers Notification if any */}
      {userVouchers.length > 0 && (
        <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-emerald-950 dark:text-emerald-200">
                You have active scholarship voucher codes!
              </p>
              <p className="text-xs text-emerald-700 dark:text-emerald-400">
                Redeem these during checkout for a 100% tuition and certificate issuance fee waiver.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {userVouchers.map((code, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-emerald-300 dark:border-emerald-700 text-xs font-mono font-bold text-emerald-800 dark:text-emerald-300 select-all"
              >
                {code}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Category Filters */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        {[
          { id: 'all', label: 'All Certificates' },
          { id: 'foundational', label: 'Foundational' },
          { id: 'professional', label: 'Professional' },
          { id: 'specialized-track', label: 'Specialized Tracks & IoT' },
          { id: 'enterprise-bundle', label: 'Full All-Access Bundle' }
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id as any)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => {
          const isBundle = product.category === 'enterprise-bundle';
          const isPurchased = orders.some(o => o.productId === product.id);

          return (
            <div
              key={product.id}
              className={`rounded-2xl border transition-all flex flex-col justify-between overflow-hidden ${
                isBundle
                  ? 'border-indigo-400 dark:border-indigo-600 bg-gradient-to-b from-indigo-50/50 to-white dark:from-indigo-950/20 dark:to-slate-900 shadow-md ring-1 ring-indigo-500/20'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md'
              }`}
            >
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider ${
                    product.level === 'Beginner'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : product.level === 'Intermediate'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                      : 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
                  }`}>
                    {product.level} Level
                  </span>
                  {product.isPopular && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                      <Sparkles className="w-3 h-3" /> Most Popular
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                    {product.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                    {product.description}
                  </p>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-2 pt-1">
                  <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    {sym}{product.price}
                  </span>
                  <span className="text-xs text-slate-400 line-through">
                    {sym}{product.originalPrice}
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                    Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </span>
                </div>

                {/* Features List */}
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  {product.features.map((feat, fidx) => (
                    <div key={fidx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                {isPurchased ? (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                    <span className="flex items-center gap-1.5">
                      <FileCheck className="w-4 h-4 text-emerald-500" />
                      Credential Active
                    </span>
                    <button
                      onClick={() => {
                        const existingCert = certificates.find(c => c.courseOrPathId === product.courseId || c.courseOrPathTitle === product.title);
                        if (existingCert) onOpenCertificateModal(existingCert);
                      }}
                      className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                    >
                      View Certificate
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleOpenCheckout(product)}
                    className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Obtain Verified Credential
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Orders & Issuance History */}
      {orders.length > 0 && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Receipt className="w-4 h-4 text-indigo-500" />
              Your Order Receipts & Verified Credentials
            </h2>
            <span className="text-xs text-slate-500">
              {orders.length} official {orders.length === 1 ? 'credential' : 'credentials'} purchased
            </span>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
            {orders.map(order => (
              <div key={order.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{order.productTitle}</p>
                  <p className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                    ID: {order.credentialIdGenerated} • Purchased on {order.purchasedAt}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-slate-900 dark:text-white">
                    {order.price === 0 ? 'Scholarship Grant (100% Free)' : `${sym}${order.price}`}
                  </span>
                  <button
                    onClick={() => {
                      const cert = certificates.find(c => c.credentialId === order.credentialIdGenerated);
                      if (cert) onOpenCertificateModal(cert);
                    }}
                    className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-indigo-600 dark:text-indigo-400 font-semibold cursor-pointer"
                  >
                    Open Diploma
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {checkoutModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                  Accreditation Checkout
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {selectedProduct.title}
                </h3>
              </div>
              <button
                onClick={() => setCheckoutModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {purchaseStatus ? (
              <div className="space-y-4 py-2">
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm">
                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                    Credential Successfully Issued!
                  </div>
                  <p>{purchaseStatus.message}</p>
                  {purchaseStatus.cert && (
                    <p className="font-mono font-bold pt-1">
                      Credential ID: {purchaseStatus.cert.credentialId}
                    </p>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      if (purchaseStatus.cert) {
                        setCheckoutModalOpen(false);
                        onOpenCertificateModal(purchaseStatus.cert);
                      }
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Award className="w-4 h-4" />
                    View & Print Certificate
                  </button>
                  <button
                    onClick={() => setCheckoutModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Order Summary */}
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Retail Accreditation Fee</span>
                    <span>{sym}{selectedProduct.originalPrice}.00</span>
                  </div>
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                    <span>Standard Academy Discount</span>
                    <span>-{sym}{selectedProduct.originalPrice - selectedProduct.price}.00</span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between font-bold text-sm text-slate-900 dark:text-white">
                    <span>Subtotal</span>
                    <span>{sym}{selectedProduct.price}.00</span>
                  </div>
                </div>

                {/* Voucher input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-indigo-500" />
                    Scholarship Voucher or Grant Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={voucherInput}
                      onChange={e => setVoucherInput(e.target.value)}
                      placeholder="e.g. CYBER-IOT-100 or GRANT-YOUTH-4821"
                      className="flex-1 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {voucherInput && (
                      <button
                        onClick={() => setVoucherInput('')}
                        className="px-2 text-xs text-slate-400 hover:text-slate-600"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Enter your scholarship grant code for 100% full fee waiver. Try <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded font-mono">CYBER-IOT-100</code>.
                  </p>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                  <div className="flex items-center gap-1.5">
                    <QrCode className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Cryptographic QR validation</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Permanent Registry Entry</span>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-2 flex gap-3">
                  <button
                    onClick={() => setCheckoutModalOpen(false)}
                    className="flex-1 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCompletePurchase}
                    className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    {voucherInput.trim() ? 'Redeem Voucher (Free)' : `Authorize ${sym}${selectedProduct.price}`}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
