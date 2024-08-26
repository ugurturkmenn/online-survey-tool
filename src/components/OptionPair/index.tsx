import React from 'react';
import Option from '../Option';
import { Option as OptionType } from '../../types';

interface OptionPairProps {
  currentOption: OptionType | null;
  nextOption: OptionType;
  onOptionSelect: (option: OptionType) => void;
}

const OptionPair: React.FC<OptionPairProps> = ({ currentOption, nextOption, onOptionSelect }) => {
  return (
    <div className="flex justify-around gap-4">
      {currentOption && (
        <Option
          option={currentOption}
          onClick={() => onOptionSelect(currentOption)}
        />
      )}
      <Option
        option={nextOption}
        onClick={() => onOptionSelect(nextOption)}
      />
    </div>
  );
};

export default OptionPair;
