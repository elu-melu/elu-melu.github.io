<script setup lang="ts">
import { ref } from "vue";
import { SwitchRoot, SwitchThumb } from "radix-vue";
import inbox from "./icons/inbox.svg?url";
import { statusRows } from "./mockData";

type Tone = "ok" | "warn" | "bad" | "neutral";

const toneClasses: Record<Tone, string> = {
  ok: "text-[var(--rv-positive)]",
  warn: "text-[var(--rv-warning)]",
  bad: "text-[var(--rv-negative)]",
  neutral: "text-[var(--rv-text-muted)]",
};

const toneByStatus: Record<string, Tone> = {
  done: "ok",
  approved: "ok",
  pending: "warn",
  queued: "warn",
  failed: "bad",
  rejected: "bad",
};

const toneOf = (status: string): Tone => toneByStatus[status] ?? "neutral";

const loading = ref(false);
const empty = ref(false);
const gridCols = "grid-cols-[minmax(12rem,1.6fr)_minmax(7rem,0.9fr)_minmax(7rem,1fr)_minmax(7rem,1fr)_minmax(7rem,0.9fr)]";
</script>

<template>
  <div class="rv flex min-w-0 flex-col gap-4">
    <div class="flex flex-wrap items-center gap-x-6 gap-y-3 text-meta">
      <label class="flex min-h-11 items-center gap-2">
        <SwitchRoot
          v-model:checked="loading"
          class="group relative inline-flex h-[26px] w-11 shrink-0 cursor-pointer items-center rounded-full bg-[var(--rv-bg)] shadow-well transition-colors duration-150 data-[state=checked]:bg-[var(--rv-primary)] data-[state=checked]:shadow-none focus-visible:outline-2 focus-visible:outline-[var(--rv-primary)]"
        >
          <SwitchThumb
            class="block h-5 w-5 translate-x-[3px] rounded-full bg-white shadow-rest transition-[transform,width] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] data-[state=checked]:translate-x-[21px] group-active:w-6 group-active:data-[state=checked]:translate-x-[17px]"
          />
        </SwitchRoot>
        Loading rows
      </label>
      <label class="flex min-h-11 items-center gap-2">
        <SwitchRoot
          v-model:checked="empty"
          class="group relative inline-flex h-[26px] w-11 shrink-0 cursor-pointer items-center rounded-full bg-[var(--rv-bg)] shadow-well transition-colors duration-150 data-[state=checked]:bg-[var(--rv-primary)] data-[state=checked]:shadow-none focus-visible:outline-2 focus-visible:outline-[var(--rv-primary)]"
        >
          <SwitchThumb
            class="block h-5 w-5 translate-x-[3px] rounded-full bg-white shadow-rest transition-[transform,width] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] data-[state=checked]:translate-x-[21px] group-active:w-6 group-active:data-[state=checked]:translate-x-[17px]"
          />
        </SwitchRoot>
        Empty state
      </label>
    </div>

    <div class="min-w-0 overflow-x-auto rounded-md bg-[var(--rv-surface)] shadow-[var(--rv-shadow)]">
      <div role="table" aria-label="Recent transactions" :aria-busy="loading" class="min-w-[44rem]">
        <div role="row" class="grid h-11 items-center gap-3 border-b border-[var(--rv-border)] px-5 text-small font-semibold text-[var(--rv-text-muted)]" :class="gridCols">
          <span role="columnheader">Asset</span>
          <span role="columnheader">Type</span>
          <span role="columnheader" class="text-right">Amount</span>
          <span role="columnheader">Date</span>
          <span role="columnheader">Status</span>
        </div>

        <!-- Loading skeleton -->
        <template v-if="loading">
          <div v-for="n in 4" :key="n" class="flex h-11 items-center border-b border-[var(--rv-border)] px-5 last:border-b-0" aria-hidden="true">
            <span class="block h-4 w-full animate-pulse rounded-sm bg-[var(--rv-bg)]" />
          </div>
        </template>

        <!-- Empty state -->
        <div v-else-if="empty" role="status" class="flex flex-col items-center gap-3 px-6 py-12 text-center">
          <img :src="inbox" width="40" height="40" alt="" aria-hidden="true" />
          <p class="text-small font-[560]">No transactions yet</p>
          <p class="text-meta text-[var(--rv-text-muted)]">Transactions will show up here once you place an order.</p>
        </div>

        <!-- Data rows -->
        <template v-else>
          <div
            v-for="row in statusRows"
            :key="row.id"
            role="row"
            class="grid min-h-11 items-center gap-3 border-b border-[var(--rv-border)] px-5 py-2 text-small last:border-b-0 hover:bg-[var(--rv-surface-hover)]"
            :class="gridCols"
          >
            <span role="cell" class="truncate font-[560]">{{ row.asset }}</span>
            <span role="cell" class="text-[var(--rv-text-muted)]">{{ row.type }}</span>
            <span role="cell" class="text-right num">{{ row.amount }}</span>
            <span role="cell" class="text-meta text-[var(--rv-text-muted)] num">{{ row.date }}</span>
            <span role="cell" class="inline-flex items-center gap-1.5 text-meta font-[560]" :class="toneClasses[toneOf(row.status)]">
              <span class="size-1.5 shrink-0 rounded-full bg-current" aria-hidden="true" />
              {{ row.status }}
            </span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
