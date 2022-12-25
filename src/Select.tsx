import styles from "./select.module.css";
import { useEffect, useState } from "react";

type SelectOption = { label: string; value: string | number };

type SingleSelectProps = {
	multiple?: false;
	value?: SelectOption;
	onChange: (value: SelectOption | undefined) => void;
};

type MultipleSelectProps = {
	multiple: true;
	value?: SelectOption[];
	onChange: (value: SelectOption[]) => void;
};

type SelectProps = {
	option: SelectOption[];
} & (SingleSelectProps | MultipleSelectProps);

export function Select({ multiple, value, onChange, options }: SelectProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [highlighted, setHighlighted] = useState(0);

	const clearOptions = () => {
		onChange(undefined);
	};

	const selectOption = (option: SelectOption) => {
		if (option !== value) onChange(option);
	};

	const isOptionSelected = (option: SelectOption) => {
		return option === value;
	};

	useEffect(() => {
		if (isOpen) setHighlighted(0);
	}, [isOpen]);

	return (
		<div
			onBlur={() => setIsOpen(false)}
			onClick={() => setIsOpen(!isOpen)}
			tabIndex={0}
			className={styles.container}
		>
			<span className={styles.value}>{value?.label}</span>
			<button
				onClick={(e) => {
					e.stopPropagation();
					clearOptions();
				}}
				className={styles["clear-btn"]}
			>
				&times;
			</button>
			<div className={styles.divider}></div>
			<div className={styles.caret}></div>
			<ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
				{options.map((option, index) => (
					<li
						onClick={(e) => {
							e.stopPropagation();
							selectOption(option);
							setIsOpen(false);
						}}
						onMouseEnter={() => setHighlighted(index)}
						key={option.value}
						className={`${styles.option} ${
							isOptionSelected(option) ? styles.selected : ""
						} ${index === highlighted ? styles.highlighted : ""}`}
					>
						{option.label}
					</li>
				))}
			</ul>
		</div>
	);
}
