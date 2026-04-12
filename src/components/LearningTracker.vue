<template>
  <section id="learning" class="py-24 bg-light-teal">
    <div class="max-w-6xl mx-auto px-6">
      <h2 class="font-mono text-3xl md:text-4xl text-deep-teal mb-2">learning</h2>
      <div class="w-12 h-0.5 bg-teal mb-4"></div>
      <p class="text-charcoal/60 text-sm mb-12 max-w-xl">
        Keeping myself accountable. Here's what I'm currently learning and what's on the
        roadmap.
      </p>

      <!-- Filter tabs -->
      <div class="flex gap-4 mb-8">
        <button
          v-for="filter in filters"
          :key="filter"
          :class="[
            'font-mono text-xs px-4 py-2 transition-colors',
            activeFilter === filter
              ? 'bg-deep-teal text-white'
              : 'border border-deep-teal/30 text-deep-teal hover:bg-deep-teal/10',
          ]"
          @click="activeFilter = filter"
        >
          {{ filter }}
        </button>
      </div>

      <!-- Items -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="item in filteredItems"
          :key="item.topic"
          class="bg-white/60 backdrop-blur-sm p-5 border border-deep-teal/10 hover:border-teal transition-colors"
        >
          <div class="flex items-center justify-between mb-3">
            <span
              :class="[
                'text-[10px] font-mono uppercase tracking-wider px-2 py-0.5',
                item.status === 'active'
                  ? 'bg-teal/20 text-deep-teal'
                  : item.status === 'completed'
                    ? 'bg-deep-teal text-white'
                    : 'bg-charcoal/10 text-charcoal/60',
              ]"
            >
              {{ item.status }}
            </span>
            <span class="font-mono text-xs text-charcoal/40"> {{ item.progress }}% </span>
          </div>
          <h4 class="text-charcoal font-semibold mb-1">
            {{ item.topic }}
          </h4>
          <p class="text-xs text-charcoal/50 font-mono mb-3">
            {{ item.category }}
          </p>
          <!-- Progress bar -->
          <div class="w-full h-1 bg-charcoal/10 rounded-full overflow-hidden">
            <div
              class="h-full rounded-full transition-all duration-700 ease-out"
              :class="
                item.status === 'active'
                  ? 'bg-teal'
                  : item.status === 'completed'
                    ? 'bg-deep-teal'
                    : 'bg-charcoal/20'
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
