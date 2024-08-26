import React from 'react';
import { Option as OptionType } from '../../types';

interface OptionProps {
  option: OptionType;
  onClick: () => void;
}

const Option: React.FC<OptionProps> = ({ option, onClick }) => {
  if (!option) return null; 

  return (
    <div onClick={onClick} className="cursor-pointer text-center p-2 border rounded-lg hover:bg-gray-100 transition"
    >
      <img className="w-36 h-36 object-cover rounded-md mx-auto mb-2"
        src={option.image} alt={option.name} />
      <p>{option.name}</p>
    </div>
  );
};

export default Option;
