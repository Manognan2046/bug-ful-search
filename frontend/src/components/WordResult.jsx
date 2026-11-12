function SectionHeading({ number, title }) {
  return (
    <h3 className="result-section-title">
      <span>{number}.</span>
      {title}
    </h3>
  );
}

function PronunciationSection({ pronunciation }) {
  if (!pronunciation) return null;

  return (
    <section className="result-section pronunciation-section">
      <SectionHeading number="1" title="Pronunciation" />
      <p className="pronunciation-word">{pronunciation.word}</p>
      {pronunciation.phonetic && (
        <p><strong>Phonetic spelling:</strong> {pronunciation.phonetic}</p>
      )}
      {pronunciation.ipa && (
        <p><strong>IPA:</strong> <span className="ipa">{pronunciation.ipa}</span></p>
      )}
    </section>
  );
}

function EtymologySection({ etymology }) {
  if (!etymology) return null;

  return (
    <section className="result-section">
      <SectionHeading number="2" title="Etymology" />
      {etymology.origin && <p>{etymology.origin}</p>}
      {etymology.original_meaning && (
        <p><strong>Original meaning:</strong> {etymology.original_meaning}</p>
      )}
      {Array.isArray(etymology.roots) && etymology.roots.length > 0 && (
        <div className="result-list-block">
          <strong>Roots:</strong>
          <ul>
            {etymology.roots.map((root, index) => <li key={`${root}-${index}`}>{root}</li>)}
          </ul>
        </div>
      )}
      {etymology.semantic_development && <p>{etymology.semantic_development}</p>}
    </section>
  );
}

function MeaningSection({ meaning }) {
  if (!meaning) return null;

  return (
    <section className="result-section">
      <SectionHeading number="3" title="Meaning" />
      {meaning.definition && <p>{meaning.definition}</p>}
      {meaning.nuance && <p>{meaning.nuance}</p>}
      {Array.isArray(meaning.connotations) && meaning.connotations.length > 0 && (
        <div className="result-list-block">
          <strong>Connotations:</strong>
          <ul>
            {meaning.connotations.map((item, index) => (
              <li key={`${item}-${index}`}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

function PartOfSpeechSection({ partOfSpeech }) {
  if (!partOfSpeech) return null;

  return (
    <section className="result-section">
      <SectionHeading number="4" title="Part of Speech" />
      {partOfSpeech.primary && <p><strong>Primary:</strong> {partOfSpeech.primary}</p>}
      {Array.isArray(partOfSpeech.related_forms) && partOfSpeech.related_forms.length > 0 && (
        <ul className="forms-list">
          {partOfSpeech.related_forms.map((form, index) => (
            <li key={`${form}-${index}`}>{form}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

function RelatedWordsSection({ words }) {
  if (!Array.isArray(words) || words.length === 0) return null;

  return (
    <section className="result-section related-words-section">
      <SectionHeading number="5" title="Related Words" />
      <div className="related-words">
        <div className="related-words-labels" aria-hidden="true">
          <span>Word</span><span>Meaning</span><span>Etymological connection</span>
        </div>
        {words.map((item, index) => (
          <article className="related-word-row" key={`${item.word}-${index}`}>
            <h4>{item.word}</h4>
            <p>{item.meaning}</p>
            <p>{item.etymological_connection}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function WordResult({ analysis }) {
  return (
    <article className="word-result">
      <h2 className="result-word">{analysis.word}</h2>
      <div className="result-sections">
        <PronunciationSection
          pronunciation={{ ...analysis.pronunciation, word: analysis.word }}
        />
        <EtymologySection etymology={analysis.etymology} />
        <MeaningSection meaning={analysis.meaning} />
        <PartOfSpeechSection partOfSpeech={analysis.part_of_speech} />
        <RelatedWordsSection words={analysis.related_words} />
      </div>
    </article>
  );
}
