export interface TProps {
  onClear: () => void;
  onResults: (suggest: TSuggestion[]) => void;
  placeholder: string;
}
