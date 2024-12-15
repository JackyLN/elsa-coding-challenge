import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1734279375337 implements MigrationInterface {
    name = 'Init1734279375337'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Questions" ("id" SERIAL NOT NULL, "content" character varying NOT NULL, "order" double precision NOT NULL, "options" text NOT NULL, "correctOption" text NOT NULL, "quizId" integer NOT NULL, "isDeleted" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8f81bcc6305787ab7dd0d828e21" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_102f5ff17d80a5e4bec76cc983" ON "Questions" ("quizId") `);
        await queryRunner.query(`CREATE TYPE "public"."Answers_result_enum" AS ENUM('0', '1', '2')`);
        await queryRunner.query(`CREATE TABLE "Answers" ("id" SERIAL NOT NULL, "questionId" integer NOT NULL, "participantId" integer NOT NULL, "selectedOption" text, "result" "public"."Answers_result_enum", "isDeleted" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e9ce77a9a6326d042fc833d63f5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_abb0aa32afdc92dd482357c96c" ON "Answers" ("participantId") `);
        await queryRunner.query(`CREATE TABLE "Participants" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying, "quizSessionId" integer NOT NULL, "isDeleted" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7938849a564a20e99153a744bad" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9c5d268ab13ce49f3f94ca04a0" ON "Participants" ("quizSessionId") `);
        await queryRunner.query(`CREATE TABLE "QuizSessions" ("id" SERIAL NOT NULL, "sessionName" character varying NOT NULL, "quizId" integer NOT NULL, "quizState" jsonb NOT NULL, "isDeleted" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_283a48f00a5d1834dc5d3ced64d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d235d392660cc47adfd63aaa35" ON "QuizSessions" ("createdAt") `);
        await queryRunner.query(`CREATE TABLE "Quizzes" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "isDeleted" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_da81bc26fb34ac5a54cda4f8863" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ac33d2e374f8c525c6c9565b76" ON "Quizzes" ("createdAt") `);
        await queryRunner.query(`ALTER TABLE "Questions" ADD CONSTRAINT "FK_102f5ff17d80a5e4bec76cc9833" FOREIGN KEY ("quizId") REFERENCES "Quizzes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Answers" ADD CONSTRAINT "FK_abb0aa32afdc92dd482357c96c3" FOREIGN KEY ("participantId") REFERENCES "Participants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Participants" ADD CONSTRAINT "FK_9c5d268ab13ce49f3f94ca04a09" FOREIGN KEY ("quizSessionId") REFERENCES "QuizSessions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "QuizSessions" ADD CONSTRAINT "FK_14a01abe32059347b3469aeaf2e" FOREIGN KEY ("quizId") REFERENCES "Quizzes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "QuizSessions" DROP CONSTRAINT "FK_14a01abe32059347b3469aeaf2e"`);
        await queryRunner.query(`ALTER TABLE "Participants" DROP CONSTRAINT "FK_9c5d268ab13ce49f3f94ca04a09"`);
        await queryRunner.query(`ALTER TABLE "Answers" DROP CONSTRAINT "FK_abb0aa32afdc92dd482357c96c3"`);
        await queryRunner.query(`ALTER TABLE "Questions" DROP CONSTRAINT "FK_102f5ff17d80a5e4bec76cc9833"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ac33d2e374f8c525c6c9565b76"`);
        await queryRunner.query(`DROP TABLE "Quizzes"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d235d392660cc47adfd63aaa35"`);
        await queryRunner.query(`DROP TABLE "QuizSessions"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9c5d268ab13ce49f3f94ca04a0"`);
        await queryRunner.query(`DROP TABLE "Participants"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_abb0aa32afdc92dd482357c96c"`);
        await queryRunner.query(`DROP TABLE "Answers"`);
        await queryRunner.query(`DROP TYPE "public"."Answers_result_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_102f5ff17d80a5e4bec76cc983"`);
        await queryRunner.query(`DROP TABLE "Questions"`);
    }

}
