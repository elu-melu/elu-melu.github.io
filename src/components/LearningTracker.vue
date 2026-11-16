<template>
  <section id="learning" class="py-24 bg-charcoal">
    <div class="max-w-6xl mx-auto px-6">
      <h2 class="font-mono text-4xl md:text-5xl text-white mb-2">Learning</h2>
      <div class="w-12 h-0.5 bg-teal mb-6"></div>
      <p class="text-white/85 mb-10 max-w-xl">
        Keeping myself accountable. Here's what I'm currently learning and what's on the
        roadmap.
      </p>

      <!-- Filter tabs -->
      <div class="flex flex-wrap gap-3 mb-8" role="group" aria-label="Filter by status">
        <button
          v-for="filter in filters"
          :key="filter"
          :class="[
            'text-sm px-4 py-2 capitalize transition-colors',
            activeFilter === filter
              ? 'bg-teal text-charcoal font-medium'
              : 'border border-white/30 text-white/85 hover:border-teal hover:text-teal',
          ]"
          @click="activeFilter = filter"
          :aria-pressed="activeFilter === filter"
        >
          {{ filter }}
        </button>
      </div>

      <!-- Items -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="item in filteredItems"
          :key="item.topic"
          class="p-5 border border-white/15 hover:border-teal transition-colors"
        >
          <div class="flex items-center justify-between mb-3">
            <span
              :class="[
                'text-xs font-semibold uppercase tracking-wider px-2 py-0.5',
                item.status === 'active'
                  ? 'bg-teal text-charcoal'
                  : item.status === 'completed'
                    ? 'bg-light-teal text-charcoal'
                    : 'bg-white/10 text-white/85',
              ]"
            >
              {{ item.status }}
            </span>
            <span class="text-sm text-white/70"> {{ item.progress }}% </span>
          </div>
          <h4 class="text-white font-semibold mb-1">
            {{ item.topic }}
          </h4>
          <p class="text-sm text-white/70 mb-3">
            {{ item.category }}
          </p>
          <!-- Progress bar -->
          <div
            class="w-full h-1 bg-white/10 rounded-full overflow-hidden"
            role="progressbar"
            :aria-valuenow="item.progress"
            aria-valuemin="0"
            aria-valuemax="100"
            :aria-label="`${item.topic} progress`"
          >
            <div
              class="h-full rounded-full transition-all duration-700 ease-out"
              :class="
                item.status === 'active'
                  ? 'bg-teal'
                  : item.status === 'completed'
                    ? 'bg-light-teal'
                    : 'bg-white/30'
              "
              :style="{ width: `${item.progress}%` }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { learningTracker } from "../data/siteData";
import type { LearningItem } from "../data/siteData";

const items = ref<LearningItem[]>(learningTracker);
const filters = ["all", "active", "planned", "completed"] as const;
const activeFilter = ref<string>("all");

const filteredItems = computed(() => {
  if (activeFilter.value === "all") return items.value;
  return items.value.filter((item) => item.status === activeFilter.value);
});
</script>
