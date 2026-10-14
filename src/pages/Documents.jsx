import React from 'react';
import { useApp } from '../context/AppContext';
import Badge from '../components/common/Badge';
import { FileText, Download, ShieldCheck } from 'lucide-react';

export default function Documents() {
  const { documents } = useApp();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 card-shadow">
        <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight my-0">
          Document Vault & Proof of Delivery
        </h1>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Cryptographically verified E-Way bills, digital POD signatures, and customs declarations.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 card-shadow overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 text-slate-400 uppercase tracking-wider text-[10px] font-bold">
              <th className="py-3 px-4">Document Name</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Shipment Order</th>
              <th className="py-3 px-4">Date Uploaded</th>
              <th className="py-3 px-4">Size</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
            {documents.map((doc) => (
              <tr key={doc.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-500 shrink-0" />
                  <span>{doc.name}</span>
                </td>
                <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300 font-semibold">{doc.type}</td>
                <td className="py-3.5 px-4 font-mono text-blue-600 dark:text-blue-400">{doc.shipmentId}</td>
                <td className="py-3.5 px-4 text-slate-500">{doc.date}</td>
                <td className="py-3.5 px-4 font-mono text-slate-500">{doc.size}</td>
                <td className="py-3.5 px-4"><Badge status={doc.status} /></td>
                <td className="py-3.5 px-4 text-right">
                  <button className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-lg cursor-pointer">
                    <Download className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
