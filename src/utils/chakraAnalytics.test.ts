import test from 'node:test';
import assert from 'node:assert/strict';
import {
  normalizeChakraId,
  calculateChakraDistribution,
  calculateChakraTimeline,
  calculatePolarityBreakdown,
  getDominantChakraInsight,
  DEMO_SAMPLE_ENTRIES,
} from './chakraAnalytics.ts';

test('normalizeChakraId accurately standardizes chakra variants', () => {
  assert.equal(normalizeChakraId('Root Chakra'), 'root');
  assert.equal(normalizeChakraId('muladhara'), 'root');
  assert.equal(normalizeChakraId('Solar Plexus'), 'solar_plexus');
  assert.equal(normalizeChakraId('Third Eye'), 'third_eye');
  assert.equal(normalizeChakraId('Heart'), 'heart');
  assert.equal(normalizeChakraId('Throat Chakra'), 'throat');
  assert.equal(normalizeChakraId('Crown'), 'crown');
});

test('calculateChakraDistribution counts and percentages match total entries', () => {
  const distribution = calculateChakraDistribution(DEMO_SAMPLE_ENTRIES);
  assert.equal(distribution.length, 7, 'Must return all 7 chakras');

  const totalCount = distribution.reduce((sum, item) => sum + item.count, 0);
  assert.equal(totalCount, DEMO_SAMPLE_ENTRIES.length);

  // Check that every item has valid properties
  for (const item of distribution) {
    assert.ok(item.name);
    assert.ok(item.color.startsWith('#'));
    assert.ok(item.percentage >= 0 && item.percentage <= 100);
  }
});

test('calculateChakraTimeline groups points chronologically', () => {
  const timeline = calculateChakraTimeline(DEMO_SAMPLE_ENTRIES);
  assert.ok(timeline.length > 0);
  for (let i = 1; i < timeline.length; i++) {
    assert.ok(
      timeline[i].timestamp >= timeline[i - 1].timestamp,
      'Timeline points must be chronologically ordered'
    );
  }
});

test('calculatePolarityBreakdown separates left, right, and both', () => {
  const polarity = calculatePolarityBreakdown(DEMO_SAMPLE_ENTRIES);
  assert.equal(polarity.length, 3);
  const leftItem = polarity.find((p) => p.key === 'left');
  const rightItem = polarity.find((p) => p.key === 'right');
  const bothItem = polarity.find((p) => p.key === 'both');

  assert.ok(leftItem && leftItem.count >= 1);
  assert.ok(rightItem && rightItem.count >= 1);
  assert.ok(bothItem && bothItem.count >= 1);
});

test('getDominantChakraInsight returns meaningful guidance', () => {
  const distribution = calculateChakraDistribution(DEMO_SAMPLE_ENTRIES);
  const insight = getDominantChakraInsight(distribution);
  assert.ok(insight.dominantChakra);
  assert.ok(insight.insight.length > 20);
});
