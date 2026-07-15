import React from 'react';

interface LogoProps {
  name: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

function getErpDomain(name: string): string {
  const normalized = name.toLowerCase();
  if (normalized.includes('sap')) return 'sap.com';
  if (normalized.includes('microsoft') || normalized.includes('dynamics')) return 'microsoft.com';
  if (normalized.includes('sage')) return 'sage.com';
  if (normalized.includes('cegid')) return 'cegid.com';
  if (normalized.includes('netsuite')) return 'netsuite.com';
  if (normalized.includes('oracle')) return 'oracle.com';
  if (normalized.includes('infor')) return 'infor.com';
  if (normalized.includes('ebp')) return 'ebp.com';
  if (normalized.includes('odoo')) return 'odoo.com';
  if (normalized.includes('ifs')) return 'ifsworld.com';
  if (normalized.includes('divalto')) return 'divalto.com';
  if (normalized.includes('proginov')) return 'proginov.com';
  if (normalized.includes('ekon')) return 'ekon.es';
  if (normalized.includes('silae')) return 'silae.fr';
  if (normalized.includes('lucca')) return 'lucca-hr.com';
  if (normalized.includes('asys') || normalized.includes('chronos')) return 'asys.fr';
  return '';
}

function getGedDomain(name: string): string {
  const normalized = name.toLowerCase();
  if (normalized.includes('doxis')) return 'doxis.com';
  if (normalized.includes('docuware')) return 'docuware.com';
  if (normalized.includes('yooz')) return 'getyooz.com';
  if (normalized.includes('m-files') || normalized.includes('mfiles')) return 'm-files.com';
  if (normalized.includes('neoledge')) return 'neoledge.com';
  if (normalized.includes('openkm')) return 'openkm.com';
  if (normalized.includes('zeendoc')) return 'zeendoc.com';
  if (normalized.includes('alfresco')) return 'alfresco.com';
  if (normalized.includes('onbase')) return 'onbase.com';
  if (normalized.includes('opentext')) return 'opentext.com';
  if (normalized.includes('efalia')) return 'efalia.com';
  if (normalized.includes('elo digital') || normalized.includes('elo')) return 'elo.com';
  if (normalized.includes('therefore')) return 'therefore.net';
  if (normalized.includes('maarch')) return 'maarch.com';
  if (normalized.includes('sharepoint') || normalized.includes('microsoft 365') || normalized.includes('microsoft')) return 'microsoft.com';
  if (normalized.includes('laserfiche')) return 'laserfiche.com';
  if (normalized.includes('nuxeo')) return 'nuxeo.com';
  return '';
}

const LOCAL_GED_LOGOS: Record<string, string> = {
  doxis: '/logos/doxis.svg',
  docuware: '/logos/docuware.png',
  yooz: '/logos/yooz.svg',
  'm-files': '/logos/mfiles.svg',
  mfiles: '/logos/mfiles.svg',
  zeendoc: '/logos/zeendoc.svg',
  neoledge: '/logos/neoledge.png',
  sharepoint: '/logos/sharepoint.svg',
  'microsoft 365': '/logos/sharepoint.svg',
  microsoft: '/logos/sharepoint.svg',
  openkm: '/logos/openkm.svg',
  opentext: '/logos/opentext.svg',
  elo: '/logos/elo.png',
  alfresco: '/logos/alfresco.svg',
  onbase: '/logos/onbase.jpg',
  efalia: '/logos/efalia.svg',
  therefore: '/logos/therefore.svg',
  maarch: '/logos/maarch.svg',
  laserfiche: '/logos/laserfiche.svg',
  nuxeo: '/logos/nuxeo.svg'
};

function renderGedFallback(name: string, size: 'sm' | 'md' | 'lg' | 'xl') {
  const cleanName = name.split(' (')[0];

  const textSizes = {
    sm: 'text-[9px] font-bold',
    md: 'text-xs font-extrabold',
    lg: 'text-sm font-extrabold',
    xl: 'text-base font-extrabold'
  };

  const textSize = textSizes[size];

  return (
    <div className="flex items-center justify-center w-full h-full text-slate-300 bg-slate-950 p-2 select-none text-center">
      <span className={`${textSize} tracking-tight font-sans truncate px-1 uppercase`}>
        {cleanName}
      </span>
    </div>
  );
}

export function ErpLogo({ name, className = '', size = 'md' }: LogoProps) {
  const [imageError, setImageError] = React.useState(false);
  const domain = getErpDomain(name);

  const sizeClasses = {
    sm: 'h-6 w-16 text-[10px]',
    md: 'h-9 w-24 text-[12px]',
    lg: 'h-12 w-32 text-[14px]',
    xl: 'h-16 w-40 text-[16px]'
  };

  const containerClass = `inline-flex items-center justify-center rounded bg-slate-900 border border-slate-800 p-1.5 select-none overflow-hidden ${sizeClasses[size]} ${className}`;

  if (domain && !imageError) {
    return (
      <div className={containerClass} title={name}>
        <img 
          src={`https://logo.clearbit.com/${domain}`} 
          alt={name} 
          className="h-full w-auto object-contain max-h-full brightness-95 contrast-105"
          referrerPolicy="no-referrer"
          onError={() => setImageError(true)}
        />
      </div>
    );
  }

  return (
    <div className={`${containerClass} bg-slate-950 border-slate-800 flex items-center justify-center`} title={name}>
      <span className="font-sans text-[10px] uppercase font-bold text-slate-300 truncate tracking-tight text-center px-1">{name}</span>
    </div>
  );
}

export function GedLogo({ name, className = '', size = 'md' }: LogoProps) {
  const [imageError, setImageError] = React.useState(false);
  const [localError, setLocalError] = React.useState(false);
  const domain = getGedDomain(name);

  const normalized = name.toLowerCase();

  const sizeClasses = {
    sm: 'h-6 w-16 text-[10px]',
    md: 'h-10 w-28 text-[12px]',
    lg: 'h-14 w-36 text-[14px]',
    xl: 'h-18 w-44 text-[16px]'
  };

  // Strip conflicting background and border utilities from parent className
  const cleanClassName = className
    .split(' ')
    .filter(c => !c.startsWith('bg-') && !c.startsWith('border-'))
    .join(' ');

  const containerClass = `inline-flex items-center justify-center rounded-xl bg-white border border-slate-200 p-2 select-none overflow-hidden ${sizeClasses[size]} ${cleanClassName}`;

  // 1. HIGH-FIDELITY OFFICIAL LOGOS
  const OFFICIAL_GED_LOGOS: Record<string, { local: string; fallback: string }> = {
    doxis: {
      local: '/logos/doxis.svg',
      fallback: 'https://www.doxis.com/files/content/rebranding/images/logos/SER_Doxi.svg'
    },
    docuware: {
      local: '/logos/docuware.png',
      fallback: 'https://upload.wikimedia.org/wikipedia/commons/e/ee/Docuware_logo_2018_bg_white_0.png'
    },
    yooz: {
      local: '/logos/yooz.svg',
      fallback: 'https://www.getyooz.com/wp-content/uploads/yooz-logo-color-1.svg'
    },
    elo: {
      local: '/logos/elo.png',
      fallback: 'https://www.an-group.one/wp-content/uploads/2025/06/elo_bp_logo_int-e1749729481690.png'
    },
    zeendoc: {
      local: '/logos/zeendoc.svg',
      fallback: 'https://www.zeendoc.com/wp-content/uploads/2025/05/zeendoc_logo-full-baseline-couleurs_rvb.svg'
    },
    sharepoint: {
      local: '/logos/sharepoint.svg',
      fallback: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Microsoft_Office_SharePoint_%282025%E2%80%93present%29.svg'
    },
    maarch: {
      local: '/logos/maarch.svg',
      fallback: 'https://maarch.com/wp-content/uploads/navLogo-2.svg'
    },
    therefore: {
      local: '/logos/therefore.svg',
      fallback: 'https://therefore.net/app/uploads/2024/02/Therefore_positive.svg'
    },
    neoledge: {
      local: '/logos/neoledge.png',
      fallback: 'https://www.neoledge.com/wp-content/uploads/2024/12/logo-neoledge.png'
    },
    laserfiche: {
      local: '/logos/laserfiche.svg',
      fallback: 'https://www.laserfiche.com/wp-content/uploads/2023/01/Laserfiche_LogotypeOnly_RGB.svg'
    },
    opentext: {
      local: '/logos/opentext.svg',
      fallback: 'https://upload.wikimedia.org/wikipedia/commons/4/46/OpenText_logo_%282025%29.svg'
    },
    openkm: {
      local: '/logos/openkm.svg',
      fallback: 'https://logo.clearbit.com/openkm.com'
    },
    efalia: {
      local: '/logos/efalia.svg',
      fallback: '/logos/efalia.svg'
    },
    'm-files': {
      local: '/logos/mfiles.svg',
      fallback: 'https://logo.clearbit.com/m-files.com'
    },
    alfresco: {
      local: '/logos/alfresco.svg',
      fallback: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Alfresco-logo.svg'
    },
    onbase: {
      local: '/logos/onbase.jpg',
      fallback: 'https://upload.wikimedia.org/wikipedia/commons/b/bf/New_OnBase_Logo_for_JP.jpg'
    },
    nuxeo: {
      local: '/logos/nuxeo.svg',
      fallback: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Nuxeo.svg'
    }
  };

  const [useFallback, setUseFallback] = React.useState(false);

  let officialKey = '';
  if (normalized.includes('doxis')) officialKey = 'doxis';
  else if (normalized.includes('docuware')) officialKey = 'docuware';
  else if (normalized.includes('yooz')) officialKey = 'yooz';
  else if (normalized.includes('elo')) officialKey = 'elo';
  else if (normalized.includes('zeendoc')) officialKey = 'zeendoc';
  else if (normalized.includes('sharepoint') || normalized.includes('microsoft 365')) officialKey = 'sharepoint';
  else if (normalized.includes('maarch')) officialKey = 'maarch';
  else if (normalized.includes('therefore') || normalized.includes('canon')) officialKey = 'therefore';
  else if (normalized.includes('neoledge')) officialKey = 'neoledge';
  else if (normalized.includes('laserfiche')) officialKey = 'laserfiche';
  else if (normalized.includes('opentext')) officialKey = 'opentext';
  else if (normalized.includes('openkm')) officialKey = 'openkm';
  else if (normalized.includes('efalia')) officialKey = 'efalia';
  else if (normalized.includes('m-files') || normalized.includes('mfiles')) officialKey = 'm-files';
  else if (normalized.includes('alfresco')) officialKey = 'alfresco';
  else if (normalized.includes('onbase')) officialKey = 'onbase';
  else if (normalized.includes('nuxeo')) officialKey = 'nuxeo';

  if (officialKey) {
    const logoInfo = OFFICIAL_GED_LOGOS[officialKey];
    const isDarkLogo = false; // Render all logos with standard uniform white containers
    const bgContainerClass = isDarkLogo
      ? `inline-flex items-center justify-center rounded-xl bg-slate-950 border border-slate-800 p-1.5 select-none overflow-hidden ${sizeClasses[size]} ${cleanClassName}`
      : `inline-flex items-center justify-center rounded-xl bg-white border border-slate-200 p-1.5 select-none overflow-hidden ${sizeClasses[size]} ${cleanClassName}`;
    
    if (!imageError) {
      return (
        <div className={bgContainerClass} title={name}>
          <img 
            src={useFallback ? logoInfo.fallback : logoInfo.local} 
            alt={name} 
            className="h-full w-auto object-contain max-h-full"
            onError={() => {
              if (!useFallback) {
                setUseFallback(true);
              } else {
                setImageError(true);
              }
            }}
          />
        </div>
      );
    }
  }

  // 2. FALLBACK/CLEARBIT FOR OTHER SOLUTIONS
  let localPath = '';
  for (const [key, path] of Object.entries(LOCAL_GED_LOGOS)) {
    if (normalized.includes(key)) {
      localPath = path;
      break;
    }
  }

  if (localPath && !localError) {
    return (
      <div className={containerClass} title={name}>
        <img 
          src={localPath} 
          alt={name} 
          className="h-full w-auto object-contain max-h-full"
          onError={() => setLocalError(true)}
        />
      </div>
    );
  }

  if (domain && !imageError) {
    return (
      <div className={containerClass} title={name}>
        <img 
          src={`https://logo.clearbit.com/${domain}`} 
          alt={name} 
          className="h-full w-auto object-contain max-h-full brightness-95 contrast-105"
          referrerPolicy="no-referrer"
          onError={() => setImageError(true)}
        />
      </div>
    );
  }

  return (
    <div className={`${containerClass} bg-slate-950 border-slate-800 flex items-center justify-center p-0`} title={name}>
      {renderGedFallback(name, size)}
    </div>
  );
}
