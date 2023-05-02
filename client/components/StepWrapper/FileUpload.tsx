import React, { useRef } from "react";
import styles from "./FileUpload.module.scss"

interface FileUploadProps {
    setFile: Function;
    accept: string;
    children: React.ReactNode;
}

const FileUpload: React.FC<FileUploadProps> = ({ setFile, accept, children }) => {
    const ref = useRef<HTMLInputElement>(null);
    
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        else {
            setFile(e.target.files[0]);
            console.log(e.target.files);
        }
    };
    
    return (
        <div className={styles.file_container} onClick={() => ref.current?.click()}>
            <input
                className={styles.file}
                type="file"
                accept={accept}
                ref={ref}
                onChange={onChange}
            />
            {children}
        </div>
    );
};

export default FileUpload;
