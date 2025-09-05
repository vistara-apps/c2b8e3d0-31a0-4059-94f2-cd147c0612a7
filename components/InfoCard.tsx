'use client';

import { cn } from '@/lib/utils';
import { InfoCardProps } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

export function InfoCard({
  variant,
  title,
  content,
  price,
  onPurchase,
  className
}: InfoCardProps) {
  const isScript = variant === 'script';
  const contentArray = Array.isArray(content) ? content : [content];

  return (
    <div className={cn(
      'glass-card p-6 hover:bg-opacity-15 transition-all duration-200',
      className
    )}>
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-shadow">{title}</h3>
        {price && (
          <div className="text-right">
            <div className="text-2xl font-bold gradient-text">
              {formatPrice(parseFloat(price))}
            </div>
            <div className="text-xs text-gray-300">One-time access</div>
          </div>
        )}
      </div>

      <div className="space-y-3">
        {contentArray.map((item, index) => (
          <div key={index} className={cn(
            'p-3 rounded-lg',
            isScript 
              ? 'bg-white bg-opacity-5 border border-white border-opacity-10' 
              : 'text-gray-200'
          )}>
            {isScript ? (
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                <span className="text-sm">{item}</span>
              </div>
            ) : (
              <p className="text-sm leading-relaxed">{item}</p>
            )}
          </div>
        ))}
      </div>

      {onPurchase && (
        <button
          onClick={onPurchase}
          className="w-full mt-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2 px-4 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200 font-medium"
        >
          Get Access
        </button>
      )}
    </div>
  );
}
