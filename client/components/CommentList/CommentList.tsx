import React from 'react';
import { IComment } from "../../types/tracks";
import CommentItem from "../CommentItem/CommentItem";
import styles from "./CommentList.module.scss"

type CommentListProps = {
    allComments: IComment[] | null;
}

const CommentList = ({allComments}: CommentListProps) => {
    return (
        <div className={styles.container}>
            {allComments?.map(comment =>
                <CommentItem key={comment?._id} comment={comment}/>
            )}
        </div>
    );
};

export default CommentList;