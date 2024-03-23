import { WordGroup } from "./wordGrouping";



type WordGroupsProps = {
    title: string;
    words: string[];
    groupWords?: (words: string[]) => WordGroup;
};

export const WordGroups = ({ title, words, groupWords }: WordGroupsProps) => {
    return (
        <div className='word-displays'>
            {title}
            {groupWords ? Object.entries(groupWords(words)).map(([category, words]) => (
                <div key={category}>
                    <h2>{category}</h2>
                    <div className="answerList">
                        {words.map((word) => (
                            <p className="answerListItem" key={word}>{word}</p>
                        ))}
                    </div>
                </div>
            )) : <div className="answerList">
                {words.map((word) => (
                    <p className="answerListItem" key={word}>{word}</p>
                ))}
            </div>}
        </div>
    );
};
