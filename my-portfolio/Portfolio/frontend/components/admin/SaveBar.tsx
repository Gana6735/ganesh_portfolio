"use client";

interface SaveBarProps {
  isDirty: boolean;
  saveStatus: 'idle' | 'saving' | 'saved';
  onSave: () => void;
  onDiscard: () => void;
  variant?: 'fixed' | 'inline';
}

export const SaveBar = ({ isDirty, saveStatus, onSave, onDiscard, variant = 'fixed' }: SaveBarProps) => {
  const baseClasses = "flex items-center gap-4 px-6 py-4 rounded-2xl border border-white/10 bg-black/80 backdrop-blur-xl animate-fade-in";
  const fixedClasses = variant === 'fixed' 
    ? "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 shadow-2xl shadow-black/60" 
    : "w-full justify-between mt-8";

  return (
    <div className={`${baseClasses} ${fixedClasses}`}>
      {saveStatus === 'saved' ? (
        <span className="flex items-center gap-2 text-green-400 font-mono text-sm font-bold tracking-widest uppercase">
          <span className="text-lg">✓</span> Saved & Applied to Live Site
        </span>
      ) : (
        <>
          <span className={`font-mono text-xs tracking-widest uppercase ${isDirty ? 'text-yellow-500' : 'text-white/30'}`}>
            {isDirty ? 'Unsaved changes' : 'Up to date'}
          </span>
          <div className="w-px h-4 bg-white/20" />
          {isDirty && (
            <button
              onClick={onDiscard}
              className="text-white/40 hover:text-white/80 font-mono text-xs tracking-widest uppercase transition-colors"
            >
              Discard
            </button>
          )}
          <button
            onClick={onSave}
            disabled={saveStatus === 'saving' || !isDirty}
            className="flex items-center gap-2 px-5 py-2 bg-industrial-cyan text-black font-black text-xs tracking-widest uppercase rounded-xl hover:scale-105 active:scale-95 transition-transform disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
          >
            {saveStatus === 'saving' ? (
              <>
                <span className="w-3 h-3 border-2 border-black/40 border-t-black rounded-full animate-spin inline-block" />
                Saving…
              </>
            ) : (
              <>
                <span>⬆</span> Save Changes
              </>
            )}
          </button>
        </>
      )}
    </div>
  );
};
