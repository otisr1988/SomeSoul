import test from 'node:test';
import assert from 'node:assert/strict';
import { queryMetaphysicalDictionary, filterDictionary, normalizeText } from './symptomDecoder.ts';
import { METAPHYSICAL_DICTIONARY } from '../data/metaphysicalData.ts';

test('normalizeText cleans punctuation and downcases correctly', () => {
  assert.equal(normalizeText('Headache & Migraine!'), 'headache migraine');
  assert.equal(normalizeText('  STRESS...   ANXIETY?  '), 'stress anxiety');
});

test('every dictionary item has valid name, chakra, coreMeaning, and relatedConcepts', () => {
  assert.ok(METAPHYSICAL_DICTIONARY.length >= 25, 'Expected at least 25 entries');
  for (const item of METAPHYSICAL_DICTIONARY) {
    assert.ok(item.id, `Item ${item.name} missing id`);
    assert.ok(item.name, `Item missing name`);
    assert.ok(item.chakra, `Item ${item.name} missing chakra`);
    assert.ok(item.healingAffirmation, `Item ${item.name} missing healingAffirmation`);
    assert.ok(item.coreMeaning, `Item ${item.name} missing coreMeaning`);
    assert.ok(Array.isArray(item.relatedConcepts), `Item ${item.name} relatedConcepts must be an array`);
    assert.ok(item.relatedConcepts.length >= 2, `Item ${item.name} must have at least 2 related concepts`);
  }
});

test('Headache includes Stress, Suppressed Emotions, and Lack of Clear Vision in relatedConcepts', () => {
  const headache = METAPHYSICAL_DICTIONARY.find((item) => item.id === 'headache_migraine');
  assert.ok(headache, 'Headache item must exist');
  
  const related = headache.relatedConcepts;
  const hasStress = related.some((c) => c.toLowerCase().includes('stress'));
  const hasSuppressed = related.some((c) => c.toLowerCase().includes('suppressed emotions'));
  const hasVision = related.some((c) => c.toLowerCase().includes('lack of clear vision'));

  assert.ok(hasStress, 'Headache must include Stress in relatedConcepts');
  assert.ok(hasSuppressed, 'Headache must include Suppressed Emotions in relatedConcepts');
  assert.ok(hasVision, 'Headache must include Lack of Clear Vision in relatedConcepts');
});

test('queryMetaphysicalDictionary correctly matches "pounding migraine on left side"', () => {
  const result = queryMetaphysicalDictionary('pounding migraine on left side', { side: 'left' });
  assert.ok(result.matchedAilments.length > 0);
  assert.equal(result.matchedAilments[0].ailment.id, 'headache_migraine');
  assert.equal(result.dominantChakras[0], 'third_eye');
  assert.ok(result.sideAnalysis?.meaning.includes('Left Side'));
  assert.ok(result.recommendedAffirmations.length > 0);
});

test('queryMetaphysicalDictionary correctly handles multi-symptom input', () => {
  const result = queryMetaphysicalDictionary('burning acid in stomach and sore throat');
  const matchedIds = result.matchedAilments.map((m) => m.ailment.id);
  assert.ok(matchedIds.includes('acid_reflux_gerd') || matchedIds.includes('sore_throat_laryngitis'));
  assert.ok(result.synthesisMessage.length > 20);
});

test('filterDictionary filters by category, chakra, and query', () => {
  const headItems = filterDictionary(METAPHYSICAL_DICTIONARY, '', 'head', 'all');
  assert.ok(headItems.length > 0);
  assert.ok(headItems.every((item) => item.bodyZone === 'head'));

  const throatChakraItems = filterDictionary(METAPHYSICAL_DICTIONARY, '', 'all', 'throat');
  assert.ok(throatChakraItems.length > 0);
  assert.ok(throatChakraItems.every((item) => item.chakra === 'throat'));

  const searchResults = filterDictionary(METAPHYSICAL_DICTIONARY, 'sciatica', 'all', 'all');
  assert.ok(searchResults.length > 0);
  assert.equal(searchResults[0].id, 'lower_back_pain_sciatica');
});
