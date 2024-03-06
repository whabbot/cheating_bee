import { useForm, SubmitHandler, UseFormRegister, FieldErrors, RegisterOptions } from 'react-hook-form';
import './App.css';
import { useState } from 'react';
import { getWords } from './wordSuggestions';
import { ReactComponent as Logo } from './assets/logo.svg';


type Inputs = {
  requiredLetter: string
  allLetters: string
}

const validationRules: {
  [name in keyof Inputs]: RegisterOptions<Inputs>;
} = {
  requiredLetter: { required: "This field is required", maxLength: { value: 1, message: "Please provide only the required letter" }, validate: (value, formValues) => formValues.allLetters.toLowerCase().includes(value) || "The required letter must be one of the seven letters" },
  allLetters: { required: "This field is required", maxLength: { value: 7, message: "Please provide the seven letters" }, minLength: { value: 7, message: "Please provide the seven letters" } }
}

const FormField = ({ register, errors, name, label }: {
  register: UseFormRegister<Inputs>, errors: FieldErrors<Inputs>, name: keyof Inputs, label: string
}) => (
  <div className='form-field'>
    <label>{label}
      <input {...register(name, validationRules[name])} />
    </label>
    {errors[name] && <span className='form-error'>{errors[name]!.message}</span>}
  </div>
)

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors
  } = useForm<Inputs>()
  const [words, setWords] = useState<string[]>([])
  const [pangrams, setPangrams] = useState<string[]>([])
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const words = getWords(data.requiredLetter, data.allLetters.split(''))
    setWords(words.otherWords)
    setPangrams(words.pangrams)
  }
  return (
    <div className="App">
      <header className="App-header">
        <Logo className='App-logo' />
        <form onSubmit={handleSubmit(onSubmit)} onReset={() => {
          setWords([]);
          setPangrams([]);
          clearErrors();
        }}>
          <FormField register={register} errors={errors} name="allLetters" label="7 Letters" />
          <FormField register={register} errors={errors} name="requiredLetter" label="Required letter" />
          <input type="submit" />
          <input type="reset" />

        </form>
        {pangrams.length > 0 && <div className='word-displays'>Pangrams: <div className="answerList">{pangrams.map((word) => <p className='answerListItem' key={word}>{word}</p>)}</div></div>}
        {words.length > 0 && <div className='word-displays'>Words containing these letters: <div className="answerList">{words.map((word) => <p className="answerListItem" key={word}>{word}</p>)}</div></div>}
      </header>
    </div>
  );
}