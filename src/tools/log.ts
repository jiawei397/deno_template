// deno-lint-ignore-file no-explicit-any
import { type Constructor, Inject, Injectable, INQUIRER, Scope } from "@nest";
import { logTime } from "@nest/uinv";
import { getLogger, initLog } from "date_file_log";
import globals from "../globals.ts";

initLog(globals.log);

export const logger = getLogger();

export const LogTime = () => {
  return logTime({ logger });
};

@Injectable({
  scope: Scope.TRANSIENT,
})
export class Logger {
  private parentName?: string;

  constructor(@Inject(INQUIRER) private parentClass: Constructor) {
    this.parentName = this.parentClass.name;
  }

  private write(
    methodName: "warning" | "info" | "debug" | "error",
    ...messages: any[]
  ): void {
    if (this.parentName) {
      logger[methodName](this.parentName, ...messages);
    } else {
      const [first, ...others] = messages;
      logger[methodName](first, ...others);
    }
  }

  debug(...messages: any[]): void {
    this.write("debug", ...messages);
  }

  info(...messages: any[]) {
    this.write("info", ...messages);
  }

  warn(...messages: any[]) {
    this.write("warning", ...messages);
  }

  error(...messages: any[]) {
    this.write("error", ...messages);
  }
}
