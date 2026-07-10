import { defineConfig } from 'vite'
// Prevent Node's EventEmitter max listeners warning during dev.
// Temporary workaround: set to 0 (infinite). Investigate source of leak for a proper fix.
process.setMaxListeners?.(0)

// Log MaxListeners warnings with stack so we can trace where listeners are added.
process.on?.("warning", (warning) => {
  try {
    if (warning && warning.name === "MaxListenersExceededWarning") {
      // Print concise info and full stack for debugging
      // This will appear in the terminal where Vite runs.
      // Keep output minimal but actionable.
      // eslint-disable-next-line no-console
      console.warn("MaxListenersExceededWarning:", warning.message);
      // eslint-disable-next-line no-console
      console.warn(warning.stack);
    }
  } catch (e) {
    // ignore
  }
});
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
  ],
})
