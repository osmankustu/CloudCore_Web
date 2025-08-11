import { render, screen } from "@testing-library/react";
import React from "react";

import TeamStatusIndicator from "../../components/Indicators/TeamStatusIndicator";

describe("TeamStatusIndicator", () => {
  test("status true ise 'Aktif Ekip' gösterir", () => {
    render(<TeamStatusIndicator status={true} />);
    expect(screen.getByText("Aktif Ekip")).toBeInTheDocument();
  });

  test("status false ise 'Pasif Ekip' gösterir", () => {
    render(<TeamStatusIndicator status={false} />);
    expect(screen.getByText("Pasif Ekip")).toBeInTheDocument();
  });

  test("status undefined ise boş metin gösterir", () => {
    render(<TeamStatusIndicator />);
    // Aktif ya da Pasif metni olmamalı
    expect(screen.queryByText(/Aktif Ekip|Pasif Ekip/)).toBeNull();
  });
});
