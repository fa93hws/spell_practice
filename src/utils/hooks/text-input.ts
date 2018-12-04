import debounce from 'lodash.debounce';
import { useState, ChangeEvent } from 'react';

export default function useTextInput(initVal: string, debounceFlag: boolean = false):[
  string,
  (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
] {
  const [val, _setVal] = useState(initVal);
  let setVal = function(ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    _setVal(ev.target.value);
  }
  if (debounceFlag === true)
    setVal = debounce(setVal);
  return [val, setVal];
}