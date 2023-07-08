import React, { FC } from "react";
import { useContextSelector } from "use-context-selector";
import styles from "./MySelect.module.scss";
import { DarkModeContext } from "../../context/ThemesContext";

interface IOption {
    value: string,
    name: string,
}

interface MySelectProps {
    options: IOption[],
    defaultValue: string,
    value: string,
    onChange: (sort: React.ChangeEvent<HTMLSelectElement>) => void
}

const MySelect: FC<MySelectProps> = ({ options, defaultValue, value, onChange }) => {
    const darkMode = useContextSelector(DarkModeContext,
        (state) => state.darkMode);
    
    return (
        <div className={darkMode ? styles.dark : styles.light}>
            <select
                className={styles.mySelect}
                value={value}
                onChange={onChange}
            >
                <option className={styles.disabled} disabled value={""}>{defaultValue}</option>
                {options.map(option =>
                    <option key={option.name} value={option.value}>{option.name}</option>
                )}
            </select>
        </div>
    );
};

export default MySelect;