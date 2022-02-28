import { useRef } from 'react';

export function FileInput({ onFileLoad }) {
  const inputRef = useRef(); // [inputRef, setInputRef] = useState();

  const onChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => onFileLoad(e.target.result);
    reader.readAsText(file);
  };

  return (
    <>
      <input
        ref={inputRef /*(input) => setInputRef(input)*/}
        type='file'
        onChange={onChange}
        style={{ display: 'none' }}
      />
      <button
        type='button'
        onClick={() => inputRef.current.click()}
        className='btn btn-ghost'
      >
        Import
      </button>
    </>
  );
}

export function FileSave({ data, name }) {
  const cleanData = (data) => {
    return data; /*
    console.log(data);
    const cleanedData = {};
    for (const key in data) {
      const arr = data[key].slice();
      let removeIt;
      while (
        (removeIt = arr.findIndex((el) => el.name.trim().length === 0)) !== -1
      ) {
        arr.splice(removeIt, 1);
      }
      cleanedData[key] = arr;
    }
    return cleanedData;*/
  };

  const startDownload = () => {
    const cleanedData = cleanData(data);
    const hiddenElement = document.createElement('a');
    hiddenElement.href =
      'data:text;charset=utf-8,' + encodeURI(JSON.stringify(cleanedData));
    hiddenElement.target = '_blank';
    hiddenElement.download = name;
    hiddenElement.click();
  };

  return (
    <button className='btn btn-ghost' onClick={startDownload}>
      Export
    </button>
  );
}
