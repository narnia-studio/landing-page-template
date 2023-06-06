import {useState} from 'preact/hooks';

export default function Counter() {
	const [value, setValue] = useState(0);

	return (
		<>
			<p>Counter: {value}</p>
			<button type='button' onClick={() => setValue(value + 1)}>
				Increment
			</button>
			<button type='button' onClick={() => setValue(value - 1)}>
				Decrement
			</button>
			<div role='alert' className='vh' aria-live='polite'>
				 {value != undefined ? `Count now is ${value}`: null }
			</div>
		</>
	)
}