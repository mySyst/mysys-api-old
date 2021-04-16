import './util/module-alias';
import { Server } from '@overnightjs/core';
import express, { Application } from 'express';
import cors from 'cors';
import { AllDemandsController } from './controllers/allDemands';
import { DemandsController } from './controllers/demands';

import * as database from '@src/database';
import { UsersController } from './controllers/users';

export class SetupServer extends Server {
  constructor(
    private port: string | number = process.env.PORT || 3000 || '0.0.0.0'
  ) {
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
    this.app.use(
      cors({
        origin: '*',
      })
    );
  }

  private SetupControllers(): void {
    const alldemandsController = new AllDemandsController();
    const demandsController = new DemandsController();
    const usersController = new UsersController();
    this.addControllers([
      demandsController,
      alldemandsController,
      usersController,
    ]);
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
    this.app.listen(process.env.PORT || this.port, () => {
      console.info('Server listening on port: ' + this.port);
    });
  }
}
