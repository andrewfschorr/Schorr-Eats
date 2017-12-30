# Copyright 2015 Google Inc. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
"""Command for listing named ports in instance groups."""
from googlecloudsdk.api_lib.compute import base_classes
from googlecloudsdk.api_lib.compute import instance_groups_utils
from googlecloudsdk.calliope import base
from googlecloudsdk.command_lib.compute import flags
from googlecloudsdk.command_lib.compute import scope as compute_scope
from googlecloudsdk.command_lib.compute.instance_groups import flags as instance_groups_flags


class GetNamedPortsBeta(base.ListCommand):
  """Implements get-named-ports command, alpha, and beta versions."""

  @staticmethod
  def Args(parser):
    parser.display_info.AddFormat('table(name, port)')
    instance_groups_flags.MULTISCOPE_INSTANCE_GROUP_ARG.AddArgument(parser)

  def Run(self, args):
    """Retrieves response with named ports."""
    holder = base_classes.ComputeApiHolder(self.ReleaseTrack())
    group_ref = (
        instance_groups_flags.MULTISCOPE_INSTANCE_GROUP_ARG.ResolveAsResource(
            args, holder.resources,
            default_scope=compute_scope.ScopeEnum.ZONE,
            scope_lister=flags.GetDefaultScopeLister(holder.client)))
    return instance_groups_utils.OutputNamedPortsForGroup(
        group_ref, holder.client)

  detailed_help = (
      instance_groups_utils.INSTANCE_GROUP_GET_NAMED_PORT_DETAILED_HELP)
