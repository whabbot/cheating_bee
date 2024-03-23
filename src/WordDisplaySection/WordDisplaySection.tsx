import { useState } from "react";
import { Words } from "../wordSuggestions"
import { GroupingMethod, groupMethods } from "./wordGrouping";
import { WordGroups } from "./WordGroups";

type WordDisplayProps = {
    words: Words
}

// TODO:
// Allow applying two groupings at once
// Allow searching for words beginning with/containing a specific letter
// Allow searching for words of a certain length
export const WordDisplaySection = ({ words }: WordDisplayProps) => {
    const { pangrams, otherWords } = words
    const [groupingMethod, setGroupingMethod] = useState<GroupingMethod>(GroupingMethod.FIRST_LETTER);

    const handleGroupingMethodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setGroupingMethod(event.target.value as GroupingMethod);
    };

    return <>
        {pangrams.length > 0 && (
            <WordGroups
                title="Pangrams:"
                words={pangrams}
            />
        )}

        <select value={groupingMethod} onChange={handleGroupingMethodChange}>
            {Object.values(GroupingMethod).map((groupingMethod) => (
                <option key={groupingMethod} value={groupingMethod}>{`Group by ${groupingMethod}`}</option>))}
        </select>

        {otherWords.length > 0 && (
            <WordGroups
                title="Words containing these letters:"
                words={otherWords}
                groupWords={groupMethods[groupingMethod]}
            />
        )}
    </>
}


