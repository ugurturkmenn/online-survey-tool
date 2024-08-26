import React, { useState, useEffect } from 'react';
import OptionPair from '../OptionPair';
import { Survey as SurveyType, Option } from '../../types';
interface SurveyProps {
  survey: SurveyType;
}

const Survey: React.FC<SurveyProps> = ({ survey }) => {
  const [remainingOptions, setRemainingOptions] = useState<Option[]>(survey.options);
  const [currentOptions, setCurrentOptions] = useState<Option[]>([]);
  const [winner, setWinner] = useState<Option | null>(null);

  useEffect(() => {
    if (survey.options.length > 1) {
      setRemainingOptions(survey.options);
      setCurrentOptions([survey.options[0], survey.options[1]]);
    } else if (survey.options.length === 1) {
      setCurrentOptions([survey.options[0]]);
    }
  }, [survey.options]);

  const handleOptionSelect = (selectedOption: Option) => {
    const newRemainingOptions = remainingOptions.filter(
      (option) => option !== selectedOption && option !== currentOptions[1]
    );

    if (newRemainingOptions.length > 0) {
      const nextOption = newRemainingOptions[0];
      setRemainingOptions(newRemainingOptions);
      setCurrentOptions([selectedOption, nextOption]);
    } else {
      setWinner(selectedOption);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">{survey.title}</h2>
      <img
        src={survey.coverImage}
        alt="Survey Cover"
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      {winner ? (
        <div className='flex justify-center flex-col'>
          <h3 className="text-xl font-semibold text-center text-green-600">
            Kazanan: {winner.name}
          </h3>
          <img className="w-12 h-12 rounded-md object-cover m-2 mx-auto" src={winner?.image} alt={winner?.name} style={{ width: '150px', height: '150px' }} />
        </div>
      ) : currentOptions.length > 1 ? (
        <OptionPair
          currentOption={currentOptions[0]}
          nextOption={currentOptions[1]}
          onOptionSelect={handleOptionSelect}
        />
      ) : (
        <div className='flex justify-center'>
          <h3 className="text-xl font-semibold text-center text-green-600">
            Kazanan: {currentOptions[0]?.name}
          </h3>
          <img className="w-12 h-12 rounded-md object-cover m-2 mx-auto" src={currentOptions[0]?.image} alt={currentOptions[0]?.name} style={{ width: '150px', height: '150px' }} />
        </div>
      )}
    </div>
  );
};

export default Survey;
