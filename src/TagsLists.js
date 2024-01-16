//TagsList.js
import { Tag } from "./Tag"

export const TagsList = ({
    tags,
    setTags
}) => {

    return (
        <>
            {tags.map((tag, index) => <Tag
                key={tag.id}
                tag={tag}
                setTags={setTags}
            />)}
        </>
    )
}