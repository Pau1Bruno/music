import React from 'react';
import { IComment } from "../../types/tracks";
import styles from "./CommentItem.module.scss";
import { useContextSelector } from "use-context-selector";
import { DarkModeContext } from "../../context/ThemesContext";
import { Delete } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { useDeleteCommentMutation } from "../../store/reducers/apiSlice";
import { useTypedSelector } from "../../hooks/useTypedSelector";

type CommentItemProps = {
    comment: IComment | null;
}

const CommentItem = ({comment}: CommentItemProps) => {
    const darkMode = useContextSelector(DarkModeContext,
        (state) => state.darkMode);

    const [ deleteComment ] = useDeleteCommentMutation();

    const {trackId} = useTypedSelector(state => state.track)

    const deleteComm = () => {
        const delObj = {
            trackId: trackId,
            commentId: comment?._id
        }
        deleteComment(delObj)
    };

    return (
        <div className={darkMode ? styles.dark : styles.light}>
            <div
                key={comment?._id}
                className={styles.comment}
            >

                <p>{comment?.username} : {comment?.text}</p>

                <IconButton className={styles.delete} onClick={deleteComm}>
                    <Delete/>
                </IconButton>
            </div>
        </div>
    );
};

export default CommentItem;