import './util/module-alias';
import { Server } from '@overnightjs/core';
import express, { Application } from 'express';
import { DemandsController } from './controllers/demands';

import * as database from '@src/database';

export class SetupServer extends Server {
  constructor(private port = 3000) {
    super();
  }

  public async init(): Promise<void> {
    this.SetupExpress();
    this.SetupControllers();
    await this.databaseSetup();
  }

  private SetupExpress(): void {
    this.app.use(express.json());
    this.SetupControllers();
  }

  private SetupControllers(): void {
    const demandsController = new DemandsController();
    this.addControllers([demandsController]);
  }

  public getApp(): Application {
    return this.app;
  }

  private async databaseSetup(): Promise<void> {
    await database.connect();
  }

  public async close(): Promise<void> {
    await database.close();
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.info('Server listening on port: ' + this.port);
    });
  }
}
