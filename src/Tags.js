import { useState } from "react"
import { ProfileData } from "./data/profileData"
import { TagsList } from "./TagsLists"
import { TagsInputField } from "./TagsInputField"

export const Tags = () => {

    const [tags, setTags] = useState(ProfileData.slice(0, 3))

    return (
        <div className="TaskTags">
            <TagsList
                tags={tags}
                setTags={setTags}
            />

            <TagsInputField
                tags={tags}
                setTags={setTags}
            />
        </div>
    )
}