const hasItems = (value) => Array.isArray(value) && value.length > 0;

function SectionHeading({ title }) {
  return <h3 className="result-section-title">{title}</h3>;
}

function Aside({ analysis }) {
  const { word, pronunciation, part_of_speech: pos } = analysis;

  return (
    <aside className="result-aside">
      <h2 className="result-word">{word}</h2>
      {pos?.primary && <span className="pos-tag">{pos.primary}</span>}

      {(pronunciation?.phonetic || pronunciation?.ipa) && (
        <div className="pronunciation">
          {pronunciation.phonetic && (
            <p><strong>Say it:</strong> {pronunciation.phonetic}</p>
          )}
          {pronunciation.ipa && (
            <p><strong>IPA:</strong> <span className="ipa">{pronunciation.ipa}</span></p>
          )}
        </div>
      )}

      {hasItems(pos?.related_forms) && (
        <ul className="forms-list" aria-label="Related forms">
          {pos.related_forms.map((form, index) => (
            <li key={`${form}-${index}`}>{form}</li>
          ))}
        </ul>
      )}
    </aside>
  );
}

function EtymologySection({ etymology }) {
  if (!etymology) return null;

  return (
    <section className="result-section">
      <SectionHeading title="Where it comes from" />
      {etymology.origin && <p>{etymology.origin}</p>}
      {etymology.original_meaning && (
        <p><strong>Original meaning:</strong> {etymology.original_meaning}</p>
      )}
      {hasItems(etymology.roots) && (
        <ol className="lineage" aria-label="Roots">
          {etymology.roots.map((root, index) => (
            <li key={`${root}-${index}`}>{root}</li>
          ))}
        </ol>
      )}
      {etymology.semantic_development && <p>{etymology.semantic_development}</p>}
    </section>
  );
}

function MeaningSection({ meaning }) {
  if (!meaning) return null;

  return (
    <section className="result-section">
      <SectionHeading title="What it means" />
      {meaning.definition && <p>{meaning.definition}</p>}
      {meaning.nuance && <p>{meaning.nuance}</p>}
      {hasItems(meaning.connotations) && (
        <div className="result-list-block">
          <strong>Connotations</strong>
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

function RelatedWordsSection({ words }) {
  if (!hasItems(words)) return null;

  return (
    <section className="result-section related-words-section">
      <SectionHeading title="Words from the same family" />
      <div className="related-words">
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
      <Aside analysis={analysis} />
      <div className="result-sections">
        <EtymologySection etymology={analysis.etymology} />
        <MeaningSection meaning={analysis.meaning} />
        <RelatedWordsSection words={analysis.related_words} />
      </div>
    </article>
  );
}
