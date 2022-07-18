import { Test } from "@nestjs/testing";
import { TestingModule } from "@nestjs/testing/testing-module";
import { IGenericRepository } from "@app/domain/interfaces/repositories/generic.repository.interface";
import { MembersEntity } from "@app/infrastructure/entities/members.entity";
import { GenericRepository } from "@app/infrastructure/repositories/generic.repository";
import { InviteMembersUseCase } from "@app/usecases/invite-members.usecase";
import { uniqBy } from "lodash";
import { InviteMemberLogicDto } from "@app/mappers/invite-members/invite-members.logic.dto";
import { newDb } from "pg-mem";
import { TeamsEntity } from "@app/infrastructure/entities/b.entity";
import { InvitationsEntity } from "@app/infrastructure/entities/invitations.entity";
import { Connection } from "typeorm";
import { v4 } from "uuid";
import { ApplicationName } from "@app/domain/enums/application-name.enum";
import { CreateTeamWithMembers } from "@app/../test/mocks/fake-scenarios";
import { MemberStatus } from "@app/domain/enums/member-status.enum";
jest.mock("lodash");

let useCase: InviteMembersUseCase;
let inMemoryConnection: Connection;
beforeEach(async () => {
  const db = newDb({
    autoCreateForeignKeyIndices: true,
  });

  db.public.registerFunction({
    implementation: () => "test",
    name: "current_database",
  });

  db.public.registerFunction({
    implementation: () => v4(),
    name: "uuid_generate_v4",
  });

  //==== create a Typeorm connection
  inMemoryConnection = await db.adapters.createTypeormConnection({
    logging: true,
    type: "postgres",
    entities: [TeamsEntity, MembersEntity, InvitationsEntity],
  });

  await inMemoryConnection.synchronize();

  const module: TestingModule = await Test.createTestingModule({
    providers: [
      InviteMembersUseCase,
      GenericRepository,
      { provide: IGenericRepository, useExisting: GenericRepository },
      { provide: Connection, useValue: inMemoryConnection },
    ],
  }).compile();
  useCase = module.get<InviteMembersUseCase>(InviteMembersUseCase);

  var teamRepository = inMemoryConnection.getRepository(TeamsEntity);
  const team = new TeamsEntity();
  team.subscription_id = "test";
  team.original_customer_id = "asd";
  team.seating_capacity = 3;
  team.application_name = ApplicationName.Artlist;
  await teamRepository.save(team);
  console.log("original team", JSON.stringify(team));
});

afterEach(() => {
  jest.clearAllMocks();
  inMemoryConnection.close();
});

describe("Test unique invite member input", () => {
  it("should pass with 3 unique users", async () => {
    try {
      const a = CreateTeamWithMembers([
        { statusName: MemberStatus.Active, email: "omri.a@a" },
        { statusName: MemberStatus.Active },
        { statusName: MemberStatus.Pending },
      ]);
      const ab = 5;
    } catch (e) {
      console.log(e);
    }
    var teamRepository = inMemoryConnection.getRepository(TeamsEntity);
    const res = await teamRepository.find({ subscription_id: "test" });
    console.log("after team", JSON.stringify(res));

    // Arrange
    const member1: InviteMemberLogicDto = new InviteMemberLogicDto(
      "1@1",
      "user1"
    );
    const member2: InviteMemberLogicDto = new InviteMemberLogicDto(
      "2@2",
      "user2"
    );
    const member3: InviteMemberLogicDto = new InviteMemberLogicDto(
      "3@3",
      "user3"
    );

    const members: InviteMemberLogicDto[] = [member1, member2, member3];

    const expectedResult = [member1.email, member2.email, member3.email];
    // Act
    var result = useCase.filterDuplicateEmails(members);

    // Assert
    // expect(result.length).toEqual(expectedResult.length);
    expect(uniqBy).toBeCalledTimes(1);
  });

  it("should pass with 2 unique users, 1 filtered", async () => {
    // Arrange
    const member1: InviteMemberLogicDto = new InviteMemberLogicDto(
      "1@1",
      "user1"
    );
    const member2: InviteMemberLogicDto = new InviteMemberLogicDto(
      "1@1",
      "user1"
    );
    const member3: InviteMemberLogicDto = new InviteMemberLogicDto(
      "3@3",
      "user3"
    );

    const members: InviteMemberLogicDto[] = [member1, member2, member3];

    const expectedResult = [member1.email, member3.email];
    var result = useCase.filterDuplicateEmails(members);

    // expect(result.length).toEqual(expectedResult.length);
    expect(uniqBy).toBeCalledTimes(1);
  });

  // it("should create team - success", async () => {
  //   // Arrange
  //   const mockGeneratedEntityId = "55ea5ff0-4231-4af4-a923-b36b43277bd8";
  //   const snakedCasedMock = transformCamelToSnakeCaseDeep(mockModelTeam);
  //   const mockTeamEntity: TeamsEntity = plainToClass(
  //     TeamsEntity,
  //     snakedCasedMock
  //   );
  //   const mockInsertResult = { identifiers: [{ id: mockGeneratedEntityId }] };
  //   teamRepositoryMock.insert.mockReturnValue(mockInsertResult);
  //   // Act
  //   const result = await service.createTeamAsync(mockModelTeam);
  //   // Assert
  //   expect(teamRepositoryMock.insert).toHaveBeenCalled();
  //   expect(teamRepositoryMock.insert).toHaveBeenCalledWith(mockTeamEntity);
  //   expect(result).toEqual(mockGeneratedEntityId);
  // });
});
