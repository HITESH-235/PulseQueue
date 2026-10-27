import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Printer, Download, X, Clock, MapPin, Building, ShieldCheck } from 'lucide-react';

export const DigitalTicketModal = ({ isOpen, onClose, token, position, estimatedWaitMinutes }) => {
  const printRef = useRef(null);

  if (!isOpen || !token) return null;

  const serviceName = token.serviceId?.name || 'Department Service';
  const prefix = token.serviceId?.prefix || 'TKN';
  const location = token.serviceId?.location || 'Main Building';
  const tokenNum = token.tokenNumber || `${prefix}-${token.sequenceNumber || '001'}`;
  const timestamp = new Date(token.joinedAt || token.createdAt || Date.now()).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  const dateStr = new Date(token.joinedAt || token.createdAt || Date.now()).toLocaleDateString([], {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const handlePrint = () => {
    window.print();
  };

  const qrPayload = JSON.stringify({
    tokenId: token._id,
    tokenNumber: tokenNum,
    service: serviceName,
    verificationCode: token.tokenNumber ? `${token.tokenNumber}-VERIFIED` : 'QL-VALID',
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-app-surface w-full max-w-md rounded-2xl shadow-2xl border border-border-light overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-light bg-app-secondary/30">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-brand-indigo" />
            <h3 className="text-base font-semibold text-text-primary">Digital Ticket & Pass</h3>
          </div>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-primary p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Ticket Card */}
        <div className="p-6 overflow-y-auto max-h-[75vh]" ref={printRef}>
          <div className="border-2 border-dashed border-brand-indigo/30 rounded-2xl p-6 bg-gradient-to-b from-brand-indigo/5 to-transparent relative">
            <div className="text-center mb-5">
              <span className="text-[10px] tracking-widest uppercase font-bold text-brand-indigo bg-brand-indigo/10 px-2.5 py-1 rounded-full">
                PulseQueue Verified Pass
              </span>
              <h2 className="text-4xl font-extrabold tracking-tight text-text-primary font-mono mt-3">
                {tokenNum}
              </h2>
              <p className="text-sm font-medium text-text-secondary mt-1">{serviceName}</p>
            </div>

            {/* QR Code */}
            <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-inner border border-border-light my-4">
              <QRCodeSVG
                value={qrPayload}
                size={140}
                level="M"
                includeMargin={true}
              />
              <span className="text-[10px] font-mono text-gray-500 mt-2">Scan at Service Desk Counter</span>
            </div>

            {/* Metadata Table */}
            <div className="grid grid-cols-2 gap-3 text-xs text-text-secondary pt-3 border-t border-border-light">
              <div className="flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-text-muted" />
                <span className="truncate">{location}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5 text-text-muted" />
                <span>{timestamp} ({dateStr})</span>
              </div>
              {position !== undefined && position !== null && (
                <div className="col-span-2 bg-brand-indigo/5 p-2 rounded-lg flex justify-between items-center text-xs">
                  <span className="text-text-secondary">Position in queue:</span>
                  <span className="font-semibold text-brand-indigo">#{position} in line</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-app-secondary/30 border-t border-border-light flex items-center justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-brand-indigo hover:bg-brand-indigo/90 rounded-xl transition-all shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>Print Pass</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DigitalTicketModal;
