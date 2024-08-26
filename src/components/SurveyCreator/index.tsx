import React, { useState } from 'react';
import { Option, Survey } from '../../types';
import { useForm, useFieldArray } from 'react-hook-form';


const initialOptions = [
  {
    "name": "Zlatan",
    "image": "https://tmssl.akamaized.net/images/foto/galerie/zlatan-ibrahimovic-milan-1631524202-70969.jpg?lm=1631524285"
  },
  {
    "name": "Henry",
    "image": "https://cdn.al-ain.com/images/2024/1/09/267-115606-thierry-henry-1417524348-3352.jpg"
  },
  {
    "name": "Bergkamp",
    "image": "https://facts.net/wp-content/uploads/2023/07/16-facts-about-dennis-bergkamp-1689591355.jpg"
  },
  {
    "name": "R9",
    "image": "https://tmssl.akamaized.net/images/foto/galerie/ronaldo-luis-nazario-de-lima-1472042256-5977.jpg?lm=1483606131"
  },
  {
    "name": "Zidane",
    "image": "https://publish-p47754-e237306.adobeaemcloud.com/adobe/dynamicmedia/deliver/dm-aid--306562eb-acc4-4394-941b-4cd287c00546/_330190795142.app.png?preferwebp=true"
  },
  {
    "name": "Messi",
    "image": "https://upload.wikimedia.org/wikipedia/commons/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg"
  },
  {
    "name": "CR7",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Cristiano_Ronaldo_Al-Nassr_2023.jpg/250px-Cristiano_Ronaldo_Al-Nassr_2023.jpg"
  }
];

interface SurveyCreatorProps {
  setSurvey: React.Dispatch<React.SetStateAction<Survey | null>>;
}

const SurveyCreator: React.FC<SurveyCreatorProps> = ({ setSurvey }) => {
  const [title, setTitle] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [options, setOptions] = useState<Option[]>(initialOptions);
  const [optionName, setOptionName] = useState('');
  const [optionImage, setOptionImage] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm<Survey>({
    defaultValues: {
      title: '',
      coverImage: 'https://tr.zotiontech-sa.com/Content/upload/2018298633/201805151150563181374.jpg',
      options: initialOptions
    },
  });

  const addOption = () => {
    if (optionName && optionImage) {
      setOptions([...options, { name: optionName, image: optionImage }]);
      setOptionName('');
      setOptionImage('');
    }
  };

  const onSubmit = () => {
    if (title && coverImage && options.length > 1) {
      setSurvey({ title, coverImage, options });
    }
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions)
  }

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Anket Oluştur</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-4'>
          <input
            {...register('title', { required: 'Anket başlığı zorunludur.' })}
            type="text"
            placeholder="Anket Başlığı"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`border rounded-md w-full p-2 ${errors.title ? 'border-red-500' : ''}`}
          />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        </div>

        <div className='mb-4'>
          <input
            {...register('coverImage', { required: 'Kapak görseli URL zorunludur.' })}
            type="text"
            placeholder="Kapak Görseli URL"
            className={`border rounded-md w-full p-2 ${errors.coverImage ? 'border-red-500' : ''}`}
            onChange={(e) => setCoverImage(e.target.value)}
            value={coverImage}
          />
          {errors.coverImage && <p className="text-red-500">{errors.coverImage.message}</p>}
        </div>

        <div>
          <input
            type="text"
            placeholder="Seçenek Adı"
            value={optionName}
            onChange={(e) => setOptionName(e.target.value)}
            className="w-1/2 p-2 border rounded-md"
          />
          <input
            type="text"
            placeholder="Seçenek Görsel URL"
            value={optionImage}
            onChange={(e) => setOptionImage(e.target.value)}
            className="w-1/2 p-2 border rounded-md"
          />
          <button type="button" className="bg-blue-500 text-white p-2 mt-2 rounded-md hover:bg-blue-600 transition"
            onClick={addOption}>Seçenek Ekle</button>
        </div>
        
        <div>
          {options.length > 0 && (
            <ul className="mb-4 mt-4">
              {options.map((option, index) => (
                <li className="flex items-center gap-2 mb-2" key={index}>
                  <button type="button" className='w-15 mr-3 bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition'
                    onClick={() => handleRemoveOption(index)}>
                    X
                  </button>
                  <img className="w-12 h-12 rounded-md object-cover" src={option.image} alt={option.name} style={{ width: '50px', height: '50px' }} />
                  <div className='flex justify-between w-100 '>
                    <span>{option.name}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <button 
          className="w-full mt-2 bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition"
          // onClick={onSubmit}
          disabled={options.length === 0 || options.some(option => !option.name)}
        >
            Anketi Oluştur
        </button>
      </form>
    </div>
  );
};

export default SurveyCreator;
