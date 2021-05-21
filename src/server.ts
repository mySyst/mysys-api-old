require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

import './util/module-alias';
import { Server } from '@overnightjs/core';
import express, { Application } from 'express';
import cors from 'cors';

import * as database from '@src/database';

import { AllDemandsController } from './controllers/allDemands';
import { DemandsController } from './controllers/demands';
import { UsersController } from './controllers/users';
import { ClarifyDemand } from './controllers/clarifyDemand';
import { AllProjectsController } from './controllers/allProjects';
import { DemandsOfProjectController } from './controllers/demandsOfProject';

export class SetupServer extends Server {
  constructor(
    private port = process.env.PORT
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
    const clarifyDemand = new ClarifyDemand();
    const allprojectsController = new AllProjectsController();
    const demandsOfProjectController = new DemandsOfProjectController()
    this.addControllers([
      demandsController,
      alldemandsController,
      usersController,
      clarifyDemand,
      allprojectsController,
      demandsOfProjectController,
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
