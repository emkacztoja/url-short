type Props = {
  theme: 'light' | 'dark';
  onToggle: () => void;
};

export const ThemeToggle = ({ theme, onToggle }: Props) => (
  <button
    className="border px-3 py-1 rounded"
    onClick={onToggle}
  >
    {theme === 'light' ? 'Dark' : 'Light'} mode
  </button>
);

