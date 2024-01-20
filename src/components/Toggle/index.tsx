"use client"

import Toggle from 'react-toggle';
import './styles.css'

type Props ={
  check: boolean
}
export default function ToggleCustom({ check }: Props) {
  return (
    <label>
      <Toggle defaultChecked={check} icons={false} onChange={() => null} />
      <span className="sr-only">toggle</span>
    </label>
  );
}
