import React, { useState } from 'react';
import SurveyCreator from './components/SurveyCreator';
import Survey from './components/Survey';
import { Survey as SurveyType } from './types';

const App: React.FC = () => {
  const [survey, setSurvey] = useState<SurveyType | null>(null);

  return (
    <div className='max-w-md mx-auto mt-10'>
      {!survey ? (
        <SurveyCreator setSurvey={setSurvey} />
      ) : (
        <Survey survey={survey} />
      )}
    </div>
  );
};

export default App;
