import React, { Suspense } from "react";
import { TamaguiProvider } from "@tamagui/web";
import { Button } from "tamagui";

import config from "../tamagui.config";

export function Component() {
  return (
    <TamaguiProvider config={config}>
      {/* if you want nice React 18 concurrent hydration, you'll want Suspense near the root */}
      <Suspense>
        <Button>Click me</Button>
      </Suspense>
    </TamaguiProvider>
  );
}
