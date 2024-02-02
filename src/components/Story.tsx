import { useEffect, useState } from "react";

import type { TOption, TStory } from "./types";

import styles from "./Story.module.scss";

type TProps = {
  story: TStory;
};

type TMemory = {
  [key: string]: string;
};

const Story = ({ story }: TProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState<undefined | string>(
    undefined
  );
  const [memory, setMemory] = useState<TMemory>({});

  const resetMemory = () => {
    setMemory({});
  };

  const getEntryById = (id: string) => {
    return story.entries.find((entry) => entry.id === id);
  };

  const [currentEntry, setCurrentEntry] = useState(
    getEntryById(story.baseEntry)
  );

  const checkConditions = (
    conditions: TOption["conditions"] | undefined,
    memory: TMemory
  ): boolean => {
    if (!conditions) return true;
    return conditions?.every(({ key, values }) => {
      return values.includes(memory[key]);
    });
  };

  const updateMemory = (actions: TOption["actions"] | undefined): void => {
    if (!actions || actions.length < 1) return;
    if (actions !== undefined) {
      setMemory((oldMemory) => {
        const newMemory = { ...oldMemory };
        actions.forEach((o) => {
          const fullfilledConditions = checkConditions(o.conditions, oldMemory);
          console.log(o, fullfilledConditions);
          if (fullfilledConditions) {
            if (o.key === "memoryReset") {
              resetMemory();
            } else {
              newMemory[o.key] = o.value;
            }
          }
        });
        return newMemory;
      });
    }
  };

  const handleChoice = (option: TOption): void => {
    setIsLoading(true);
    setSelectedOption(option.text);

    setTimeout(() => {
      updateMemory(option.actions);
      setIsLoading(false);
      setCurrentEntry(getEntryById(option.nextEntry));
      setSelectedOption(undefined);
    }, 400);
  };

  useEffect(() => {
    console.log(memory);
  }, [memory]);

  return (
    <div className={styles.story}>
      <h1 className={styles.title}>{story.title}</h1>
      <section
        className={`${styles.entry} ${isLoading && styles.collapsedEntry}`}
      >
        {currentEntry?.desc.map((p) => (
          <p key={p}>{p}</p>
        ))}
        <div className={styles.options}>
          {currentEntry?.options
            ?.filter((o) => {
              return (
                o.conditions === undefined ||
                o.conditions?.every(({ key, values }) => {
                  return values.includes(memory[key]);
                })
              );
            })
            .map((o) => {
              return (
                <button
                  key={o.text}
                  className={`${o.text === selectedOption && styles.selected}`}
                  onClick={() => handleChoice(o)}
                  disabled={isLoading}
                >
                  {o.text}
                </button>
              );
            })}
        </div>
      </section>
    </div>
  );
};

export default Story;
