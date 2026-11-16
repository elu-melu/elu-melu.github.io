<script setup lang="ts">
import { computed, ref } from "vue";
import { performanceSeries } from "./mockData";

// Dependency-free charts: plain inline SVG, no chart library.
const W = 600;
const H = 200;
const PAD = 12;
const GRID_Y = [H / 4, H / 2, (H * 3) / 4];

const tabs = Object.keys(performanceSeries);
const activeTab = ref("YTD");
const series = computed(() => performanceSeries[activeTab.value]);
const latest = computed(() => series.value.values.at(-1) ?? 0);

function toPoints(values: number[]): [number, number][] {
  const min = Math.min(...values);
  const range = Math.max(...values) - min || 1;
  const step = W / Math.max(values.length - 1, 1);
  return values.map((v, i) => [i * step, H - PAD - ((v - min) / range) * (H - PAD * 2)]);
}

const points = computed(() => toPoints(series.value.values));
const linePath = computed(() => points.value.map(([x, y]) => `${x},${y}`).join(" "));
const areaPath = computed(() => `0,${H} ${linePath.value} ${W},${H}`);
// Direct label at the line end, positioned as a percentage of the chart height.
const endTop = computed(() => `${((points.value.at(-1)?.[1] ?? 0) / H) * 100}%`);
// Put the label on the side the last segment isn't coming from, so the line never crosses it.
const endFalling = computed(() => (points.value.at(-2)?.[1] ?? 0) < (points.value.at(-1)?.[1] ?? 0));
</script>

<template>
  <div class="rv min-w-0">
    <!-- Performance chart -->
    <section
      aria-labelledby="r10-perf-title"
      class="flex min-w-0 flex-col gap-4 rounded-md bg-[var(--rv-surface)] p-4 shadow-[var(--rv-shadow)] md:p-6"
    >
      <header class="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h4 id="r10-perf-title" class="text-heading">Portfolio performance</h4>
          <p class="text-meta text-[var(--rv-text-muted)]">Total growth and returns over time</p>
        </div>
        <div class="flex gap-1 rounded-md bg-[var(--rv-bg)] p-1" role="group" aria-label="Time range">
          <button
            v-for="tab in tabs"
            :key="tab"
            type="button"
            :aria-pressed="activeTab === tab"
            class="min-h-9 rounded-sm px-3 text-small font-[560] transition-colors duration-150 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-[var(--rv-primary)]"
            :class="activeTab === tab ? 'bg-[var(--rv-primary)] text-[var(--rv-primary-fg)]' : 'text-[var(--rv-text-2)]'"
            @click="activeTab = tab"
          >
            {{ tab }}
          </button>
        </div>
      </header>

      <p class="text-heading text-[var(--rv-positive)] num">
        +{{ latest }}%
        <span class="text-meta font-normal text-[var(--rv-text-muted)]">over {{ activeTab }}</span>
      </p>

      <div class="relative">
        <svg
          :viewBox="`0 0 ${W} ${H}`"
          preserveAspectRatio="none"
          class="h-[180px] w-full md:h-[260px]"
          role="img"
          :aria-label="`Performance over ${activeTab}, latest ${latest} percent`"
        >
          <g stroke="var(--rv-chart-grid)" stroke-width="1">
            <line v-for="y in GRID_Y" :key="y" x1="0" :y1="y" :x2="W" :y2="y" vector-effect="non-scaling-stroke" />
          </g>
          <polygon :points="areaPath" fill="var(--rv-chart-1)" fill-opacity="0.1" />
          <polyline
            :points="linePath"
            fill="none"
            stroke="var(--rv-chart-1)"
            stroke-width="2"
            stroke-linejoin="round"
            vector-effect="non-scaling-stroke"
          />
        </svg>
        <span
          class="pointer-events-none absolute right-0 text-meta font-[560] text-[var(--rv-chart-1)] num"
          :class="endFalling ? 'translate-y-1.5' : '-translate-y-[calc(100%+0.375rem)]'"
          :style="{ top: endTop }"
        >
          {{ latest }}%
        </span>
      </div>

      <div class="flex justify-between text-meta text-[var(--rv-text-muted)] num">
        <span v-for="label in series.labels" :key="label">{{ label }}</span>
      </div>
    </section>
  </div>
</template>
